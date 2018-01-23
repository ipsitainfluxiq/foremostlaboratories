var express = require('express');
var app = express();
var port = process.env.PORT || 3010;
var request = require('request');
var cheerio = require('cheerio');
var http = require('http').Server(app);
var mailer = require("nodemailer");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var randomString = require('random-string');
var filename=new Array();

app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '90mb', extended: false}));

var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
emitter.setMaxListeners(0)


var multer  = require('multer');
var datetimestamp='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //  cb(null, '../uploads/');
        cb(null, '../src/assets/images/uploads/');
        //  cb(null, '../assets/images/uploads/'); //for server
    },
    filename: function (req, file, cb, res) {
       // console.log('file.originalname');
        console.log(file);
        console.log('888888888');
        filename.push(file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        cb(null, filename[filename.length-1]);
    }
});


var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/uploads', function(req, res) {
    console.log('call uploads');
    datetimestamp = Date.now();
    upload(req,res,function(err){
        console.log(1);
         console.log(err);
         console.log(filename);

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        else{
            res.json(filename[filename.length-1]);
            setTimeout(function () {
                console.log('-----');

                console.log(filename[filename.length-1]);
                console.log(filename.length);
                console.log(filename);
                filename=[];
                return;
            },1000);
        }
    });
});



        /*-------------------------------------CONNECTION-------------------------------------*/
var connection = mysql.createConnection({
    /*    host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'influxiq_foremost_laborotaries'   */
    host     : 'influxiq.com',
    user     : 'influxiq_foremos',
    password : 'P@ss0987',
    database : 'influxiq_foremost_laborotaries'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
})



        /*-------------------------------------COMMON_START--------------------------------------------*/
app.post('/login', function (req, resp) {
    var crypto = require('crypto');
    var secret = req.body.password;
    /*  var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');*/

    var email=req.body.email;
    console.log("SELECT * FROM user_info WHERE personal_email = '"+email+"'");
    connection.query("SELECT * FROM user_info WHERE personal_email = '"+email+"'", function (err, rows, fields) {
        // console.log(' err-----?wat is going on?');
        // console.log(err);
        console.log('rows-- ?wat is going on?');
        console.log(rows);
        //  console.log(fields);

        if(rows.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Username invalid...'}));
            return;
        }
        if(rows.length>0 && rows[0].password!=secret){
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        /* if(items.length>0 && items[0].status!=1){
         resp.send(JSON.stringify({'status':'error','msg':'You are Blocked..'}));
         return;
         }*/
        if(rows.length>0 && rows[0].password==secret){
            resp.send(JSON.stringify({'status':'success','msg':rows[0]}));
            return;
        }
    });
});


app.post('/changepassword', function (req, resp) {
    var secretold = req.body.oldpassword;
    var secretnew = req.body.password;
    var logid = req.body.logid;
    // console.log(logid);
    // console.log(secretold);
    connection.query("SELECT * FROM user_info WHERE id="+logid+" AND password="+secretold, function (err, rows, fields) {
        if(rows.length==0) {
            resp.send(JSON.stringify({'status': 'error', 'msg': 'Old password doesnot match'}));
            return;
        }
        else {
            connection.query("UPDATE user_info SET password='"+secretnew+"' WHERE id="+logid, function (err, rows1, fields) {
                //  console.log(rows);
                //  console.log('rows-------------');
                resp.send(JSON.stringify({'status': 'success', 'msg':rows[0]}));
            });
        }
    });
});

app.post('/forgetpassword', function (req, resp) {
    // console.log(req.body.email);
    //  collection.find({ email:req.body.email }).toArray(function(err, items) {
    connection.query("SELECT * FROM user_info WHERE personal_email='"+req.body.email+"'", function (err, rows, fields) {
        var first_name=rows[0].first_name;
        var last_name=rows[0].last_name;

        if(rows.length>0){
            var generatedcode = randomString({length: 25});
            var data = {
                accesscode: generatedcode,
            }
            //  collection.update({ email:req.body.email}, {$set: data}, true, true);
            connection.query("UPDATE user_info SET accesscode='"+generatedcode+"' WHERE personal_email='"+req.body.email+"'", function (err, rows1, fields) {
            });
            var smtpTransport = mailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });
            var message2='<div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;"><img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 20px auto; "><div style="padding:10px; font-size: 14px; color: #333; line-height:22px;"><span style="font-size:16px; color:#29b0de;">Dear <span style="color:#333;">'+first_name+' '+last_name+',</span></span><br/><br/>The Access Code is:<span style="font-size:14px; color:#29b0de;"> '+generatedcode+'</span><br/>Please use this access code to generate a new password OR Click on the link given below:<br/><span style="font-size:14px; color:#29b0de;"><a href="http://testbed.foremostlab.com.influxiq.com/#/generatedcode/'+generatedcode+'">http://testbed.foremostlab.com.influxiq.com</a></span><br/></div></div>';

            var mail = {
                from: "Admin <ipsitaghosal1@gmail.com>",
                to: req.body.email,
                // to: 'ipsita@yopmail.com',
                subject: 'Access code',
                html: message2
            }
            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });
            resp.send(JSON.stringify({'status':'success','msg':rows[0]}));
        }
        if(rows.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Emailid invalid...'}));
            return;
        }
    });
});

app.post('/accesscodecheck', function (req, resp) {
    var logid = req.body.logid;
    //  console.log(logid);
    //  console.log(req.body.accesscode);
    connection.query("SELECT * FROM user_info WHERE id='"+logid+"' and accesscode = '"+req.body.accesscode+"'", function (err, rows, fields) {
        if(rows.length>0) {
            resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
        }
        if(rows.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Wrong access code'}));
            return;
        }
    });
});

app.post('/newpassword', function (req, resp) {
    var secret = req.body.password;
    var logid = req.body.logid;
    connection.query("UPDATE user_info SET password='"+secret+"' WHERE id='"+logid+"'", function (err, rows, fields) {
    });
    resp.send(JSON.stringify({'status': 'success', 'msg':''}));
});

app.post('/deleteimage', function (req, resp) {
    if (req.body.id != ''){
        var o_id = req.body.id;
        var collection = db.collection('blog_management');
        var data = {
            image: ''
        }
        connection.query("UPDATE blog_management SET image='' WHERE id="+o_id, function (err, rows, fields) {
        });
    }

    var fs = require('fs');
    // var filePath = "/home/influxiq/public_html/projects/mzsadie/uploads/" +req.body.image;
    var filePath = req.body.image; // Path set //
    //   var filePath = "../assets/images/uploads/" +req.body.image; // Path set //
    fs.unlinkSync(filePath);
    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));

});

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}




/*-------------------------------------ADMIN_START--------------------------------------------*/
app.post('/addadmin',function(req,resp){  //TYPE=1
    var crypto = require('crypto');
    var secret = req.body.password;
    /*  var hash = crypto.createHmac('sha256', secret)
          .update('password')
          .digest('hex');*/
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var email = req.body.email;
    // var password = hash;
    var password = secret;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var phone = req.body.phone;
    var  type= 1;
    var add_time = req.body.add_time;
    connection.query("INSERT into user_info VALUES (NULL,'"+first_name+"','"+last_name+"','"+email+"','"+password+"','NULL','"+phone+"','"+address+"','"+city+"','"+state+"','"+zip+"','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','"+add_time+"','"+type+"','NULL','NULL')", function (err, rows, fields) {
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});


app.get('/adminlist',function (req,resp) {
    connection.query("SELECT * FROM user_info WHERE type = '1'", function (err, rows, fields) {
        if (err) {
            //  console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.post('/deleteadmin', function (req, resp) {
    var id = req.body.id;
    connection.query(" DELETE FROM user_info WHERE id="+id, function (err, rows, fields) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});


app.post('/editadmin',function(req,resp){
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var phone = req.body.phone;
    var id = req.body.id;

    connection.query("UPDATE user_info SET first_name='"+first_name+"',last_name='"+last_name+"',address='"+address+"',city='"+city+"',state='"+state+"',postal_code='"+zip+"',cellphone='"+phone+"' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});


app.post('/details',function(req,resp){        // this is for editadmin page
    var resitem = {};
    var id =req.body._id;

    connection.query("SELECT * FROM user_info WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});



/*-------------------------------------REPRESENTATIVE_START--------------------------------------------*/
app.post('/sendmail',function(req,resp) {
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var personal_email = req.body.personal_email;


    /*----------------------------------mail 2-----------------------------------------*/
    var smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "itplcc40@gmail.com",
            pass: "DevelP7@"
        }
    });
    var message1='<div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;"><img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 20px auto; "><div style="padding:10px; font-size: 14px; color: #333; line-height:22px;"><span style="font-size:16px; color:#29b0de;">Dear <span style="color:#333;">'+first_name+' '+last_name+',</span></span><br/><br/><!--Please feel free to return to our website and log in to learn the clinical details of the Lab sales opportunities we offer.<br/>Once you have logged in the top navigation will activate for you to review the details of the different lab work opportunities we have for your physicians.-->Thank you for filling out to become an Ambassador representative for Foremost Laboratories. You can log in now and start going through the materials and training that is available. You will also get access to our staff contact information as well as the opportunity to jump on our Wednesday calls!  WELCOME ABOARD!<br/><br/>Login: <a href="http://testbed.foremostlab.com.influxiq.com/login">http://testbed.foremostlab.com.influxiq.com/login</a><br/><br/><span style="font-size:14px; color:#29b0de;">Username: <span style="color:#333;">'+personal_email+',</span></span><br/><span style="font-size:14px; color:#29b0de;">Password: <span style="color:#333;">'+password+',</span></span><br/><br/>Please log into your portal now if you would like to speak with one of our account managers on exactly how to get started!<br/><br/>Thanks</div></div>';
    var mail1 = {
        from: '"Foremostlab Admin" <support@foremostlab.com>',
        subject: 'Thank you for submitting the questionnaire to Foremost Labs',
        to : personal_email,
        html: message1,
        replyTo: 'support@foremostlab.com',
        sender: 'support@foremostlab.com',
    }

    smtpTransport.sendMail(mail1, function (error, response) {
        console.log('send1');
        smtpTransport.close();
    });
    resp.send(JSON.stringify({'status':'success'}));
});


    app.post('/user_info',function(req,resp) {  // TYPE= 0

    var id = req.body.id; //id = value i.e. update ,, id==null insert new rep
    console.log('is is --'+id);
    var password = randomString({length: 10});
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var personal_email = req.body.personal_email;
    var secondary_email = req.body.secondary_email;
    var cellphone = req.body.cellphone;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var postal_code = req.body.postal_code;
    var best_time = req.body.best_time;
    var healthcare_industry_year = req.body.healthcare_industry_year;
    var carrer_change = req.body.carrer_change;
    var doctor_count = req.body.doctor_count;
    var get_started = req.body.get_started;
    var additional_info = req.body.additional_info;
    var background_info = req.body.background_info;
    var greatest_attribute = req.body.greatest_attribute;
    var add_time = req.body.add_time;

    if(typeof(id)=='undefined') {
        connection.query("INSERT into user_info VALUES (NULL,'"+first_name+"','"+last_name+"','"+personal_email+"','"+password+"','"+secondary_email+"','"+cellphone+"','"+address+"','"+city+"','"+state+"','"+postal_code+"','"+best_time+"','"+healthcare_industry_year+"','"+carrer_change+"','"+doctor_count+"','"+get_started+"','"+additional_info+"','"+background_info+"','"+greatest_attribute+"','"+add_time+"','0','NULL','1')", function (err, rows, fields) {

            // 0 for type, null for accesscode, 1 for status-active

            if (!err) {
                /*----------------------------------mail 1---------------------------------------*/
                var smtpTransport = mailer.createTransport({
                    service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });

            var message = '<html><body><div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;">';
            message += '<img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 0 auto; margin-top: 20px;">';
            message += '<h2 style="display: block; text-align: center; padding: 15px 0; text-transform: uppercase; font-size: 22px; color: #1faeed; margin: 0px;">User Information</h2>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; border-top: solid 1px #ddd; color: #1faeed;">Name : <span style="color: #000;"> ' + first_name+ ' ' + last_name+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Personal Email :  <span style="color: #000;">' +personal_email+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Secondary Email : <span style="color: #000;"> ' +secondary_email+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Cell Phone : <span style="color: #000;"> ' +cellphone+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;" >Address : <span style="color: #000;"> ' +address+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">City : <span style="color: #000;"> ' +city+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">State : <span style="color: #000;"> ' +state+ '</span></div>';
            message += '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Postal Code : <span style="color: #000;"> ' +postal_code+ '</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Best Time To Reach Me : <span style="color: #000;"> ' +best_time+ '</span></div>';
            message += '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Heathcare Industry Experience   <span style="color: #000;">: ' +healthcare_industry_year+ '</span></div>';
            message += '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Reason For Career Change/sideline Income  :  <span style="color: #000;">' +carrer_change+'</span></div>';
            message += '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Doctor/Clinics Relation :  <span style="color: #000;">'+doctor_count+ '</span></div>';
            message += '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Ready To Started : <span style="color: #000;"> ' +get_started+ '</span></div>';
            message += '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Additional Info : <span style="color: #000;"> ' +additional_info+ '</span></div>';
            message += '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Background In Health Industry : <span style="color: #000;"> ' +background_info+ '</span></div>';
            message += '<div style="width: auto; padding: 10px;  color: #1faeed; background: #ddd;" >Greatest Attributes : <span style="color: #000;"> ' +greatest_attribute+ '</span></div>';
            message += '<div style="width: auto; padding: 10px;  color: #1faeed;" ><h2 style="text-align: center; font-size: 22px; color: #1faeed; display: block; width: 100%; padding: 0px; margin: 0px;">Login Info</h2></div>';
            message += '<div style="width: auto; padding: 10px;  color: #1faeed; background: #ddd;" >Username : <span style="color: #000;"> '+personal_email+'</span></div>';
            message += '<div style="width: auto; padding: 10px;  color: #1faeed;" >Password : <span style="color: #000;">'+password+'</span></div>';
            message += '</div></body></html>';
            var mail = {
                  to : 'ipsita.influxiq@gmail.com',
                subject : 'New Form Submission from website http://foremostlaboratories.com/ By '+first_name+' '+last_name ,
                html: message,
                from: '"Foremostlab Admin" <support@foremostlab.com>',
                replyTo: 'support@foremostlab.com',
                sender: 'support@foremostlab.com',
            }

            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });

            /*----------------------------------mail 2-----------------------------------------*/
            var smtpTransport = mailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });
            var message1='<div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;"><img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 20px auto; "><div style="padding:10px; font-size: 14px; color: #333; line-height:22px;"><span style="font-size:16px; color:#29b0de;">Dear <span style="color:#333;">'+first_name+' '+last_name+',</span></span><br/><br/><!--Please feel free to return to our website and log in to learn the clinical details of the Lab sales opportunities we offer.<br/>Once you have logged in the top navigation will activate for you to review the details of the different lab work opportunities we have for your physicians.-->Thank you for filling out to become an Ambassador representative for Foremost Laboratories. You can log in now and start going through the materials and training that is available. You will also get access to our staff contact information as well as the opportunity to jump on our Wednesday calls!  WELCOME ABOARD!<br/><br/>Login: <a href="http://testbed.foremostlab.com.influxiq.com/login">http://testbed.foremostlab.com.influxiq.com/login</a><br/><br/><span style="font-size:14px; color:#29b0de;">Username: <span style="color:#333;">'+personal_email+',</span></span><br/><span style="font-size:14px; color:#29b0de;">Password: <span style="color:#333;">'+password+',</span></span><br/><br/>Please log into your portal now if you would like to speak with one of our account managers on exactly how to get started!<br/><br/>Thanks</div></div>';
            var mail1 = {
                from: '"Foremostlab Admin" <support@foremostlab.com>',
                subject: 'Thank you for submitting the questionnaire to Foremost Labs',
                to : personal_email,
                html: message1,
                replyTo: 'support@foremostlab.com',
                sender: 'support@foremostlab.com',
            }

            smtpTransport.sendMail(mail1, function (error, response) {
                console.log('send1');
                smtpTransport.close();
            });
            console.log(rows);
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
    }

   else {
        connection.query("UPDATE user_info SET first_name='"+first_name+"',last_name='"+last_name+"',secondary_email='"+secondary_email+"',cellphone='"+cellphone+"',address='"+address+"',city='"+city+"',state='"+state+"',postal_code='"+postal_code+"',best_time='"+best_time+"',healthcare_industry_year='"+healthcare_industry_year+"',carrer_change='"+carrer_change+"',doctor_count='"+doctor_count+"',get_started='"+get_started+"',additional_info='"+additional_info+"',background_info='"+background_info+"',greatest_attribute='"+greatest_attribute+"',add_time='"+add_time+"' WHERE id="+id, function (err, rows, fields) {
            if (!err) {
                resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
            }
            else {
                console.log(err);
                resp.send(JSON.stringify({'status':'error','id':0}));
            }
        });
    }
});

app.get('/representativelist',function (req,resp) {
    connection.query("SELECT * FROM user_info WHERE type = '0'", function (err, rows, fields) {
        if (err) {
            //  console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.post('/representativedetails',function(req,resp){
    var resitem = {};
    var id =req.body.id;
    connection.query("Select * from user_info where id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/changestatus',function(req,resp){
    var status = req.body.status;
    var id = req.body.id;

    connection.query("UPDATE user_info SET status='"+status+"' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});




/*---------------------------------------------BLOG CATEGORY -------------------------------------------------*/
app.post('/addblogcategory',function(req,resp){
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;
    // console.log(description);
    connection.query("INSERT into blog_category VALUES (NULL,'"+title+"','"+mysql_real_escape_string(description)+"','"+status+"')", function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.get('/blogcategorylist',function (req,resp) {
    connection.query("SELECT * FROM blog_category", function (err, rows, fields) {
        if (err) {
           // console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.post('/deleteblogcategory', function (req, resp) {
    var id = req.body.id;
    connection.query(" DELETE FROM blog_category WHERE id="+id, function (err, rows, fields) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.post('/blogcategorydetails',function(req,resp){
    var resitem = {};
    var id =req.body.id;

    connection.query("SELECT * FROM blog_category WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/editblogcategory',function(req,resp){
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;
    var id = req.body.id;

    connection.query("UPDATE blog_category SET title='"+title+"',description='"+description+"',status='"+status+"' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});



/*---------------------------------------------BLOG MANAGEMENT -------------------------------------------------*/
app.post('/addblogmanagement',function(req,resp){
    var title = req.body.title;
    var description = req.body.description;
    var bloglist = req.body.bloglist;
    var image = req.body.image;
    //  var video = req.body.video;
    var status = req.body.status;
    var priority = req.body.priority;
    var datetimestamp = Date.now();
    connection.query("INSERT into blog_management VALUES (NULL,'"+title+"','"+mysql_real_escape_string(description)+"','"+bloglist+"','"+image+"','"+status+"','"+priority+"','"+datetimestamp+"')", function (err, rows, fields) {
        // console.log(err);
      // console.log(rows);
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.post('/deleteblogmanagement', function (req, resp) {
    connection.query("DELETE FROM blog_management WHERE id="+req.body.id, function (err, rows, fields) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.get('/blogmanagementlist',function (req,resp) {
    connection.query("SELECT blog_management.id,blog_management.title,blog_management.description,blog_management.image,blog_management.status,blog_management.priority,blog_management.datetimestamp,blog_category.title as cat_title FROM blog_category INNER JOIN blog_management ON blog_management.bloglist=blog_category.id", function (err, rows, fields) {
        if (err) {
          //   console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
          //  console.log(rows);
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.get('/blogmanagementlist_activeonly',function (req,resp) {
    connection.query("SELECT blog_management.id,blog_management.title,blog_management.description,blog_management.image,blog_management.status,blog_management.priority,blog_management.datetimestamp,blog_category.title as cat_title FROM blog_category INNER JOIN blog_management ON blog_management.bloglist=blog_category.id where blog_management.status=1", function (err, rows, fields) {
        if (err) {
          //   console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            console.log(rows);
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.post('/blogmanagementdetails',function(req,resp){
    var resitem = {};
    var id =req.body.id;
    connection.query("SELECT * FROM blog_management WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
          /*  connection.query("SELECT blog_management.id,blog_management.title,blog_management.description,blog_management.image,blog_management.status,blog_management.priority,blog_category.title as cat_title FROM blog_category INNER JOIN blog_management ON blog_management.bloglist=blog_category.id ", function (err1, rows1, fields) {

                if (err1){
                    resp.send("failed");
                    throw err;
                }
                else {*/
                    resitem = rows[0];
                    resp.send(JSON.stringify({'status':'success','item':resitem}));
              //  }
          //  });
        }
    });
});

app.post('/editblogmanagement',function(req,resp){
    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var bloglist = req.body.bloglist;
    var status = req.body.status;
    var priority = req.body.priority;
    var id = req.body.id;
    var datetimestamp = Date.now();

    connection.query("UPDATE blog_management SET title='"+title+"',description='"+mysql_real_escape_string(description)+"',image='"+image+"',bloglist='"+bloglist+"',status='"+status+"',priority='"+priority+"',datetimestamp='"+datetimestamp+"' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});

app.post('/getblogmanagement',function (req,resp) {
    var id =req.body.id;
    connection.query("SELECT * FROM blog_management where id=" + id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','res':[]}));
        } else {
            // console.log(rows[0]);
            resp.send(JSON.stringify({'status':'success','res':rows[0]}));
        }
    });
});



/*---------------------------------------------------------VIDEO_MANAGER------------------------------------------------------------*/
app.post('/videomanagerdetails',function(req,resp){
    var resitem = {};
    var blogmanagementid =req.body.blogmanagementid;

    connection.query("SELECT * FROM video_management WHERE blogmanagementid="+blogmanagementid, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows;
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/addvideomanager',function(req,resp){
    console.log('call');
    var title = req.body.title;
    var description = req.body.description;
    var videocategory = req.body.videocategory;
    var videolink = req.body.videolink;
    var blogmanagementid = req.body.blogmanagementid;

    connection.query("INSERT into video_management VALUES (NULL,'"+title+"','"+mysql_real_escape_string(description)+"','"+videocategory+"','"+videolink+"','"+blogmanagementid+"')", function (err, rows, fields) {
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.post('/deletevideomanager', function (req, resp) {
    var id = req.body.id;
    connection.query(" DELETE FROM video_management WHERE id="+id, function (err, rows, fields) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.post('/videomanagerdetailsofparticularvalue',function(req,resp){
    var resitem = {};
    var id =req.body.id;
  //  console.log("SELECT * FROM video_management WHERE id="+id);
    connection.query("SELECT * FROM video_management WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/editvideomanager',function(req,resp){
  //  console.log('call edit video manager');
    var title = req.body.title;
    var description = req.body.description;
    var videocategory = req.body.videocategory;
    var videolink = req.body.videolink;

    connection.query("UPDATE video_management SET title='"+title+"',description='"+description+"',videocategory='"+videocategory+"',videolink='"+videolink+"' WHERE id="+req.body.id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});

app.post('/getvideomanagement',function (req,resp) {
    var blogmanagementid =req.body.id;
    connection.query("SELECT * FROM video_management where blogmanagementid=" + blogmanagementid, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','res':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','res':rows}));
        }
    });
});

app.post('/blogmanagement_videomanagement_list',function (req,resp) {

    var id =req.body.id;
    connection.query("SELECT blog_management.id,blog_management.title,blog_management.description,blog_management.image,blog_management.status,blog_management.priority,blog_management.datetimestamp,video_management.title as video_management_title,video_management.description as video_management_description,video_management.videocategory as video_management_videocategory,video_management.videolink as video_management_videolink FROM video_management INNER JOIN blog_management ON blog_management.id=video_management.blogmanagementid where video_management.blogmanagementid=" + id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});


/*----------------------------------------------------doctor manager--------------------------------------------------------*/
app.post('/doctoradd',function(req,resp){
    connection.query("INSERT into doctor_management VALUES (NULL,'"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.officemanager+"','"+req.body.name_practice+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.cellphone+"','"+req.body.officenumber+"','"+req.body.address+"','"+req.body.address2+"','"+req.body.city+"','"+req.body.state+"','"+req.body.zip+"','"+req.body.contacttime+"','"+req.body.timezone+"','"+req.body.firstcontact+"','"+req.body.marketingmaterials+"','"+req.body.datepractice+"','"+req.body.ownerid+"')", function (err, rows, fields) {
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.post('/doctoraddnote',function(req,resp){
    connection.query("INSERT into doctor_notes VALUES (NULL,'"+req.body.docid+"','"+req.body.note+"','"+req.body.timestamp+"','"+req.body.ownerid+"')", function (err, rows, fields) {
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.post('/doctorlist',function (req,resp) {
    var ownerid = req.body.ownerid;
    var usertype = req.body.usertype;

    if(usertype == 1) { //admin can see all deoctorlist
        var doquery = "SELECT * FROM user_info RIGHT JOIN doctor_management on doctor_management.ownerid = user_info.id";
    }
    if(usertype == 0) { //representative can see only their deoctorlist
        var doquery = "SELECT * FROM user_info RIGHT JOIN doctor_management on doctor_management.ownerid = user_info.id where ownerid=" + ownerid;
    }
        connection.query(doquery, function (err, rows, fields) {
            if (err) {
                resp.send(JSON.stringify({'res':[]}));
            } else {
                resp.send(JSON.stringify({'res':rows}));
            }
        });
});

app.post('/doctornote',function (req,resp) {
    var ownerid =req.body.ownerid;
    var docid =req.body.docid;
    var usertype = req.body.usertype;
/*    SELECT * FROM member m1
    JOIN card c1 ON c1.member = m1.id
    WHERE m1.id IN (
        SELECT DISTINCT m.id from member m
    JOIN card c ON c.member = m.id
    WHERE (c.LastModifiedDate >=sinceDate  OR m.LastModifiedDate >= sinceDate))*/
    var doquery="SELECT * FROM doctor_notes LEFT JOIN user_info on doctor_notes.owner_id = user_info.id where doctor_id=" + docid;
    connection.query(doquery, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.post('/doctordetails',function(req,resp){
    var resitem = {};
    var id =req.body.id;
    connection.query("Select * from doctor_management where id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/doctoredit',function(req,resp){
    connection.query("UPDATE doctor_management SET officemanager='"+req.body.officemanager+"',name_practice='"+req.body.name_practice+"',cellphone='"+req.body.cellphone+"',officenumber='"+req.body.officenumber+"',address='"+req.body.address+"',address2='"+req.body.address2+"',city='"+req.body.city+"',state='"+req.body.state+"',zip='"+req.body.zip+"',contacttime='"+req.body.contacttime+"',timezone='"+req.body.timezone+"',firstcontact='"+req.body.firstcontact+"',marketingmaterials='"+req.body.marketingmaterials+"',datepractice='"+req.body.datepractice+"' WHERE id="+req.body.id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});



/*----------------------------------------------------WELCOME_MESSAGE--------------------------------------------------------*/
app.post('/addwelcomemessage',function(req,resp){  // Add = 1  ,   Update = 2
    var admin_id = req.body.owner_id;
    var  welcome_message= req.body.welcome_message;
    var  type = req.body.type;
    if(type ==1){
        var doquery = "INSERT into welcome_message VALUES (NULL,'"+welcome_message+"','"+admin_id+"')";
    }
    if(type ==2){
        var doquery = "UPDATE welcome_message SET message='"+welcome_message+"'";
    }
        connection.query(doquery, function (err, rows, fields) {
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.get('/getwelcomemessage',function (req,resp) {
    connection.query("SELECT * FROM welcome_message", function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','res':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','res':rows[0]}));
        }
    });
});



/*----------------------------------------------------file manager--------------------------------------------------------*/
app.post('/addfile',function(req,resp){
    console.log('call');
    var name = req.body.name;
    var servername = req.body.servername;
    var uploadedfilename = req.body.uploadedfilename;
    var description = req.body.description;
    var status = req.body.status;
    var priority = req.body.priority;

    connection.query("INSERT into filemanager VALUES (NULL,'"+name+"','"+servername+"','"+uploadedfilename+"','"+mysql_real_escape_string(description)+"','"+status+"','"+priority+"')", function (err, rows, fields) {
        console.log(rows);
        console.log(err);
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.get('/filelist',function (req,resp) {
    connection.query("SELECT * from filemanager", function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':rows}));
        }
    });
});

app.post('/deletefile', function (req, resp) {
    connection.query("DELETE FROM filemanager WHERE id="+req.body.id, function (err, rows, fields) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.post('/filedetails',function(req,resp){
    var resitem = {};
    var id =req.body.id;
    connection.query("SELECT * FROM filemanager WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/editfilemanager',function(req,resp){
    var id = req.body.id;
    var name = req.body.name;
    var servername = req.body.servername;
    var description = req.body.description;
    var status = req.body.status;
    var priority = req.body.priority;
    var uploadedfilename = req.body.uploadedfilename;

    connection.query("UPDATE filemanager SET servername='NULL', uploadedfilename='NULL' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
    });

    connection.query("UPDATE filemanager SET name='"+name+"',description='"+mysql_real_escape_string(description)+"',servername='"+servername+"',uploadedfilename='"+uploadedfilename+"',status='"+status+"',priority='"+priority+"' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});


/*----------------------------------------------------Common_End--------------------------------------------------------*/

app.get('/getusastates',function (req,resp) {


    var usastates=[
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ];

    resp.send(usastates);

});