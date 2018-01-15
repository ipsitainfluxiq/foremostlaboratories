import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboardmessageadd',
  templateUrl: './dashboardmessageadd.component.html',
  styleUrls: ['./dashboardmessageadd.component.css'],
    providers: [Commonservices],
})
export class DashboardmessageaddComponent implements OnInit {
    public serverurl;
    public ckeditorContent;
    private addcookie: CookieService;
    private cookiedetails;
    private type;
    public showsuccessalert;

    constructor( private _http: Http, private router: Router, private _commonservices: Commonservices, addcookie: CookieService, public _sanitizer: DomSanitizer) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.serverurl = _commonservices.url;
        this.ckeditorContent = '';
        this.type = 1;
        this.showsuccessalert = false;
    }

    ngOnInit() {
        /*<div [innerHTML]="_sanitizer.bypassSecurityTrustHtml(item.bio)" ></div>*/
        this.getwelcomemessage();
    }
    getwelcomemessage() {
        let link = this.serverurl + 'getwelcomemessage';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                console.log(result.res);
                console.log(typeof(result.res));
                if (result.status == 'success') {
                    if ((typeof(result.res)) != 'undefined') {
                        console.log(result.res.message);
                    this.ckeditorContent = result.res.message;
                    console.log(this.ckeditorContent);
                    this.type = 2; // update = 2
                    }
                    if ((typeof(result.res)) == 'undefined') {
                        this.type = 1; // add = 1
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    addmessage() {
        console.log( this.ckeditorContent);
        let link = this.serverurl + 'addwelcomemessage';
        let data = {
            owner_id: this.cookiedetails.id,
            welcome_message: this.ckeditorContent,
            type: this.type
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.showsuccessalert = true;
                }
            }, error => {
                console.log('Oooops!');
            });
    }

}