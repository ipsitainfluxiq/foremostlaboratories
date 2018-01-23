import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-blogmanagementlist',
  templateUrl: './blogmanagementlist.component.html',
  styleUrls: ['./blogmanagementlist.component.css'],
    providers: [Commonservices],
})
export class BlogmanagementlistComponent implements OnInit {
    private fb;
    public datalist;
    public datalist1;
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


    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.orderbyquery = 'title';
        this.orderbytype = 1;
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.serverurl = _commonservices.url;
        this.getblogmanagementlist();
    }

    ngOnInit() {
    }

    getblogmanagementlist() {
        let link = this.serverurl + 'blogmanagementlist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result.res;
                console.log(this.datalist);
                   this.list_length = result.res.length;
                   this.totalpage = this.list_length / this.showrows ;
                   if (this.totalpage != parseInt(this.totalpage)) {
                       this.totalpage = parseInt(this.totalpage) + 1;
                   }
                   console.log('this.datalist/////////');
                   console.log(this.datalist);
               }, error => {
                   console.log('Oooops!');
               });
    }
    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
        console.log(this.isModalShown);
    }

    onHidden() {
        this.isModalShown = false;
    }

    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
            // console.log('caret-up');
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

    blogmanagementrdelt() {
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deleteblogmanagement';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Data Deleted');
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            console.log('calling????????????????????? ?');
            this.getblogmanagementlist();
        }, 300);
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
    callit(images) {
        console.log(images);
        // console.log(JSON.parse(images));
        if (images == null || images=='') {
            return 'cogo.png';
        }
       /* if (images!=null && images !='' && images.indexOf('[') < 0) {
            return '../../assets/images/' + images;
        }*/
        else {
        let img = JSON.parse(images);
        console.log('img-------------');
        console.log(img);
      //  return img[1];
        return '../../assets/images/uploads/' + img[0];
        }
    }
}