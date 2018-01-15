import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import * as moment from 'moment';

@Component({
  selector: 'app-doctorviewnote',
  templateUrl: './doctorviewnote.component.html',
  styleUrls: ['./doctorviewnote.component.css'],
    providers: [Commonservices]
})
export class DoctorviewnoteComponent implements OnInit {
    docid: number;
    public serverurl;
    private cookiedetails;
    private addcookie: CookieService;
    public datalist;
    private addcookie1: CookieService;
    private usertype;

    constructor(private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, addcookie: CookieService, addcookie1: CookieService) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.addcookie1 = addcookie1 ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.usertype = this.addcookie1.getObject('usertype');
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.docid = params['id'];
            console.log('??' + this.docid);
        });
        this.getDoctorNote();
    }

    getDoctorNote() {
        let link = this.serverurl + 'doctornote';
        let data = {
            docid: this.docid,
            ownerid: this.cookiedetails.id,
            usertype: this.usertype
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result.res;
                console.log('result doctornote of that rep--------');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }
    showdate(convertdate) {
        convertdate = moment(convertdate);
        return(convertdate.format('YYYY-MM-DD'));
    }
}
