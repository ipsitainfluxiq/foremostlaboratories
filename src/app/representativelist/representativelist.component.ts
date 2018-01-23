import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-representativelist',
  templateUrl: './representativelist.component.html',
  styleUrls: ['./representativelist.component.css'],
    providers: [Commonservices],
})
export class RepresentativelistComponent implements OnInit {
    private fb;
    public datalist;
    public id;
    orderbyquery: any;
    orderbytype: any;
    private isModalShown: boolean = false;
    public serverurl;
    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public list_length;


    constructor(fb: FormBuilder, private _http: Http,  private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.orderbyquery = 'first_name';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.getrepresentativelist();
    }

    ngOnInit() {
    }
    getrepresentativelist() {
        let link = this.serverurl + 'representativelist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result.res;
                this.list_length = result.res.length;
                this.totalpage = this.list_length / this.showrows ;
                if (this.totalpage != parseInt(this.totalpage)) {   // it means if the totalpage is 1.4 or any values that is not round number
                    this.totalpage = parseInt(this.totalpage) + 1;
                }
                console.log('result representativelist--------');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }

    changestatus(id, status) {
        let link= this.serverurl + 'changestatus';
        let data = {id: id, status: status};
        this._http.post(link, data)
            .subscribe(data => {
                this.getrepresentativelist();
            }, error => {
                console.log('Oooops!');
            });
    }
    sendmailforefully(item) {
        console.log(item);
        let link= this.serverurl + 'sendmail';
        let data = {
            first_name: item.first_name,
            last_name: item.last_name,
            personal_email: item.personal_email,
            password: item.password,
          /*  var cellphone = req.body.cellphone;
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
        var add_time = req.body.add_time;*/
        };
        console.log(data);
        this._http.post(link, data)
            .subscribe(data => {
            }, error => {
                console.log('Oooops!');
            });
    }
    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
            return 'caret-down';
        }
        return 'caret-up-down';
    }

    manageSorting(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            this.orderbytype = 1;
            return;
        }
        if (this.orderbyquery == value && this.orderbytype == 1) {
            this.orderbytype = -1;
            return;
        }
        this.orderbyquery = value;
        this.orderbytype = 1;
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