import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css'],
    providers: [Commonservices],
})
export class DoctorlistComponent implements OnInit {
    private fb;
    public datalist;
    public id;
    public serverurl;
    private cookiedetails;
    private addcookie: CookieService;
    private addcookie1: CookieService;
    private usertype;
    private searchval: any = {first_name: ''};

    constructor( private _http: Http,  private router: Router, private _commonservices: Commonservices, addcookie: CookieService, addcookie1: CookieService, public _sanitizer: DomSanitizer) {
        this.addcookie = addcookie ;
        this.addcookie1 = addcookie1 ;
        this.serverurl = _commonservices.url;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.usertype = this.addcookie1.getObject('usertype');
        this.getDoctorList();
       /* if(typeof(this.searchval=='undefined')){
            this.searchval='';
        }*/
    }

  ngOnInit() {
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
                this.datalist = result.res;
               // this.searchval = this.datalist;
                console.log('result DoctorList of that rep--------');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }

    valueChanged(data: any): string {
      /*  if (data == '') {
            this.searchval = { firstname : '' };
        }
        else {*/
        // return `(${data[id]}) ${data[value]`;
        console.log(data);
        console.log('hi');
        return data;
      //  }
    }
    autocompleListFormatter = (data: any) => {
        let html = `<span>(${data.id}) ${data.first_name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
}
