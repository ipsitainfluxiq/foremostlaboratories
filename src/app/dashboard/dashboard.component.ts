import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    providers: [Commonservices],
})
export class DashboardComponent implements OnInit {
    public serverurl;
    private addcookie1: CookieService;
    private usertype;
    private welcome_message;
    private blogmanagementlist;
    private cookiedetails;
    private doctorlist;
    private representativelist;
    private addcookie: CookieService;
    orderbyquery: any;
    orderbydocquery: any;
    orderbyrepquery: any;

  constructor( private _http: Http, private router: Router, private _commonservices: Commonservices, addcookie1: CookieService, public _sanitizer: DomSanitizer, addcookie: CookieService) {
      this.addcookie1 = addcookie1 ;
      this.addcookie = addcookie ;
      this.usertype = this.addcookie1.getObject('usertype'); // 1 = admin  ,, 0 = representative
      this.serverurl = _commonservices.url;
      this.cookiedetails = this.addcookie.getObject('cookiedetails');
      console.log('? ' + this.usertype);
      this.orderbyquery = 'datetimestamp';
      this.orderbyquery = 'title';
      this.orderbydocquery = 'firstname';
      this.orderbyrepquery = 'first_name';
  }

    ngOnInit() {
        this.getwelcomemessage();
        this.getblogmanagementlist();
         this.getDoctorList();
        this.getrepresentativelist();
    }

    getrepresentativelist() {
        let link = this.serverurl + 'representativelist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.representativelist = result.res;
                console.log('result representativelist--------');
                console.log(this.representativelist);
            }, error => {
                console.log('Oooops!');
            });
    }

    getblogmanagementlist() {
        let link = this.serverurl + 'blogmanagementlist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.blogmanagementlist = result.res;
                console.log(this.blogmanagementlist);
                /* this.list_length = result.res.length;
                this.totalpage = this.list_length / this.showrows ;
                if (this.totalpage != parseInt(this.totalpage)) {
                    this.totalpage = parseInt(this.totalpage) + 1;
                }*/
              //  console.log('this.datalist/////////');
              //  console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }
    getDoctorList() {
        let link = this.serverurl + 'doctorlist';
        let data = {
            ownerid: this.cookiedetails.id,
            usertype: this.usertype
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.doctorlist = result.res;
                console.log('result DoctorList--');
                console.log(this.doctorlist);
            }, error => {
                console.log('Oooops!');
            });
    }
    getwelcomemessage() {
        let link = this.serverurl + 'getwelcomemessage';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
               // console.log(result);
                if (result.status == 'success') {
                    if ((typeof(result.res)) != 'undefined') {
                        this.welcome_message = result.res.message;
                      //  console.log(this.welcome_message);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    gettypeClass() {
        if (this.usertype == 0) {
            return 'wrappercontain2';
        }
        if (this.usertype == 1) {
            return '';
        }
        return '';
    }
    callit(images) {
        console.log(images);
        if (images == null || images=='') {
            return '../../assets/images/logo.png';
        }
        else {
            let img = JSON.parse(images);
            console.log('img-------------');
            console.log(img);
            return '../../assets/images/uploads/' + img[0];
        }
    }
    viewindetail(itemid) {
    //  alert('??');
        this.router.navigate(['/blogpostdetail', itemid]);
    }
}
