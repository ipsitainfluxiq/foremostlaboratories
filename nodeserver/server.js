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

app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '90mb', extended: false}));

var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
emitter.setMaxListeners(0)


var multer  = require('multer');
var datetimestamp='';
var filename='';
var filename1='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //  cb(null, '../uploads/');
        cb(null, '../src/assets/images/uploads/');
        //  cb(null, '../assets/images/uploads/'); //for server
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log('file.originalname'+file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        // console.log(filename);
        cb(null, filename);
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
    datetimestamp = Date.now();
    upload(req,res,function(err){
        /*console.log(1);
         console.log(err);
         console.log(filename);*/

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        res.json(filename);


    });
});

/*app.post('/uploads1', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json(filename1);
    });
});*/


/*
var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/foremostlab';

var MongoClient = mongodb.MongoClient;

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;
        console.log('connected');
    }});
*/


/*-------------------------------------ADMIN_START--------------------------------------------*/

/*app.post('/user_info',function(req,resp){
    var collection = db.collection('user_info');
    var crypto = require('crypto');
    collection.insert([{
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        personal_email: req.body.personal_email,
        secondary_email: req.body.secondary_email,
        cellphone: req.body.cellphone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        best_time: req.body.best_time,
        healthcare_industry_year: req.body.healthcare_industry_year,
        carrer_change: req.body.carrer_change,
        doctor_count: req.body.doctor_count,
        get_started: req.body.get_started,
        additional_info: req.body.additional_info,
        background_info: req.body.background_info,
        greatest_attribute: req.body.greatest_attribute,
        add_time: req.body.add_time,

    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});*/

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
app.post('/user_info',function(req,resp) {  // TYPE= 0

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


    /* var data= {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        personal_email: req.body.personal_email,
        secondary_email: req.body.secondary_email,
        cellphone: req.body.cellphone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        best_time: req.body.best_time,
        healthcare_industry_year: req.body.healthcare_industry_year,
        carrer_change: req.body.carrer_change,
        doctor_count: req.body.doctor_count,
        get_started: req.body.get_started,
        additional_info: req.body.additional_info,
        background_info: req.body.background_info,
        greatest_attribute: req.body.greatest_attribute,
        add_time: req.body.add_time,

    };*/

//connection.query('SELECT * from user_info', function(err, rows, fields) {
    connection.query("INSERT into user_info VALUES (NULL,'"+first_name+"','"+last_name+"','"+personal_email+"','"+password+"','"+secondary_email+"','"+cellphone+"','"+address+"','"+city+"','"+state+"','"+postal_code+"','"+best_time+"','"+healthcare_industry_year+"','"+carrer_change+"','"+doctor_count+"','"+get_started+"','"+additional_info+"','"+background_info+"','"+greatest_attribute+"','"+add_time+"','0','NULL')", function (err, rows, fields) {
        if (!err) {
            /*----------------------------------mail 1-----------------------------------------------------------------*/
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
               // to : 'shawnhull@foremostlabratories.com,betoparedes@foremostlaboratories.com',
                  to : 'ipsita.influxiq@gmail.com',
                subject : 'New Form Submission from website http://foremostlaboratories.com/ By '+first_name+' '+last_name ,
                from : personal_email,
                html: message
            }

            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });

            /*----------------------------------mail 2-----------------------------------------------------------------*/
            var smtpTransport = mailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });
            var message1='<div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;"><img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 20px auto; "><div style="padding:10px; font-size: 14px; color: #333; line-height:22px;"><span style="font-size:16px; color:#29b0de;">Dear <span style="color:#333;">'+first_name+' '+last_name+',</span></span><br/><br/>Please feel free to return to our website and log in to learn the clinical details of the Lab sales opportunities we offer.<br/>Once you have logged in the top navigation will activate for you to review the details of the different lab work opportunities we have for your physicians.<br/><br/><span style="font-size:14px; color:#29b0de;">User <span style="color:#333;">'+personal_email+',</span></span><br/><span style="font-size:14px; color:#29b0de;">Password <span style="color:#333;">'+password+',</span></span><br/><br/>Login: http://www.foremostlaboratories.com/login.php <br/><br/>We will get back in touch with you very soon!<br/><br/>Thanks</div></div>';
            var mail1 = {
                //  from: 'Admin',
                from: 'shawnhull@foremostlabratories.com,betoparedes@foremostlaboratories.com',
                subject: 'Thank you for submitting the questionnaire to Foremost Labs',
                to : personal_email,
                // to : 'ipsita.influxiq@gmail.com',
                html: message1
            }
            smtpTransport.sendMail(mail1, function (error, response) {
                console.log('send1');
                smtpTransport.close();
            });
        }
        else {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});


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
    connection.query("INSERT into user_info VALUES (NULL,'"+first_name+"','"+last_name+"','"+email+"','"+password+"','NULL','"+phone+"','"+address+"','"+city+"','"+state+"','"+zip+"','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','"+add_time+"','"+type+"','NULL')", function (err, rows, fields) {
        if (!err) {
             resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
            console.log('Error while performing Query.');
            resp.send(JSON.stringify({'status':'error','id':0}));
        }
    });
});

app.post('/login', function (req, resp) {
    var crypto = require('crypto');
    var secret = req.body.password;
  /*  var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');*/

    var email=req.body.email;
  //  console.log("SELECT * FROM user_info WHERE personal_email = '"+email+"'");
    connection.query("SELECT * FROM user_info WHERE personal_email = '"+email+"'", function (err, rows, fields) {
        console.log(err);
        console.log(rows);
        console.log(fields);

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

app.get('/adminlist',function (req,resp) {
    connection.query("SELECT * FROM user_info WHERE type = '1'", function (err, rows, fields) {
        if (err) {
            console.log(err);
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

app.post('/details',function(req,resp){        // this is for editadmin page
    console.log("details from server.js called");
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
                console.log(rows);
                console.log('rows-------------');
                resp.send(JSON.stringify({'status': 'success', 'msg':rows[0]}));
            });
        }
    });
});
app.post('/forgetpassword', function (req, resp) {
    console.log(req.body.email);
    //  collection.find({ email:req.body.email }).toArray(function(err, items) {
    connection.query("SELECT * FROM user_info WHERE personal_email='"+req.body.email+"'", function (err, rows, fields) {
        console.log(rows);
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
            var mail = {
                from: "Admin <ipsitaghosal1@gmail.com>",
                 to: req.body.email,
               // to: 'ipsita@yopmail.com',
                subject: 'Access code',
                html: 'Access code is given -->  '+generatedcode
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
    console.log(logid);
    console.log(req.body.accesscode);
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

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
})


/*
----------------------------------------------BLOG MANAGER ----------------------------------------------------------*/

app.post('/addblogcategory',function(req,resp){
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;

    connection.query("INSERT into blog_category VALUES (NULL,'"+title+"','"+description+"','"+status+"')", function (err, rows, fields) {
        if (!err) {
            resp.send(JSON.stringify({'status':'success','id':rows.insertId}));
        }
        else {
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

app.post('/addblogmanagement',function(req,resp){
    var title = req.body.title;
    var description = req.body.description;
    var bloglist = req.body.bloglist;
    var image = req.body.image;
  //  var video = req.body.video;
    var status = req.body.status;
    var priority = req.body.priority;

    connection.query("INSERT into blog_management VALUES (NULL,'"+title+"','"+description+"','"+bloglist+"','"+image+"','"+status+"','"+priority+"')", function (err, rows, fields) {
       console.log(err);
       console.log(rows);
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
    connection.query("SELECT blog_management.id,blog_management.title,blog_management.description,blog_management.image,blog_management.status,blog_management.priority,blog_category.title as cat_title FROM blog_category INNER JOIN blog_management ON blog_management.bloglist=blog_category.id", function (err, rows, fields) {
        if (err) {
             console.log(err);
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

    connection.query("UPDATE blog_management SET title='"+title+"',description='"+description+"',image='"+image+"',bloglist='"+bloglist+"',status='"+status+"',priority='"+priority+"' WHERE id="+id, function (err, rows, fields) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resitem = rows[0];
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});

app.post('/deleteimage', function (req, resp) {
    console.log(req.body.image);
    if (req.body.id != ''){
        var o_id = req.body.id;
        var collection = db.collection('blog_management');
        var data = {
            image: ''
        }
     //   collection.update({_id: o_id}, {$set: data}, true, true);
        connection.query("UPDATE blog_management SET image='' WHERE id="+o_id, function (err, rows, fields) {
        });
    }

    var fs = require('fs');
    // var filePath = "/home/influxiq/public_html/projects/mzsadie/uploads/" +req.body.image;
    var filePath = req.body.image; // Path set //
    //   var filePath = "../assets/images/uploads/" +req.body.image; // Path set //
    console.log('filepath is  ' +filePath);
    fs.unlinkSync(filePath);
    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));

});