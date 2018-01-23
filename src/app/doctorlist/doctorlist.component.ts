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

    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public list_length;

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
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
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
                this.list_length = result.res.length;
                this.totalpage = this.list_length / this.showrows ;
                if (this.totalpage != parseInt(this.totalpage)) {   // it means if the totalpage is 1.4 or any values that is not round number
                    this.totalpage = parseInt(this.totalpage) + 1;
                }
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



    /*______________________________________________page_initiation_______________________________________*/

    pageval(type) {

        if (type == 1 ) {       // for prev page
            if ((this.pagestart - this.showrows) >= 0) {
                this.pageno--;
                this.pagestart = (this.pageno - 1) * this.showrows;
            }
        }

        if ( type == 2 ) {      // for next page
            if (this.list_length - this.showrows - 1 >= this.pagestart) {
                this.pagestart = this.pageno * this.showrows;
                this.pageno++;
            }
        }

        if ( type == 3 ) {    // for goto input type
            if ( (this.pageno >0) && (this.pageno <= this.totalpage) ) {
                this.pagestart = (this.pageno - 1) * this.showrows;
            } else {
                this.pageno = 1;
                this.pagestart = 0;
            }
        }

        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
    }

    chagevalues() {
        this.totalpage = this.list_length / this.showrows ;
        if (this.list_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
            this.totalpage = parseInt(this.totalpage);
        }
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
    }


}
