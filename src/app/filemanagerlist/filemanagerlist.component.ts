import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-filemanagerlist',
  templateUrl: './filemanagerlist.component.html',
  styleUrls: ['./filemanagerlist.component.css'],
    providers: [Commonservices]
})
export class FilemanagerlistComponent implements OnInit {
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

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.orderbyquery = 'name';
        this.orderbytype = 1;
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.serverurl = _commonservices.url;
        this.getfilelist();
    }

  ngOnInit() {
  }

    getfilelist() {
        let link = this.serverurl + 'filelist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result.res;
                console.log(this.datalist);
                console.log('==========');
               /* for (let j in this.datalist) {
                    console.log(this.datalist[j].servername);
                }*/
             //  this.datalist[filetype]=this.datalist.servername;
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

    filedelt() {
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deletefile';
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
            this.getfilelist();
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
    callit(filename) {
       // console.log(filename);
        // console.log(JSON.parse(images));
        if (filename == null || filename=='') {
            return '';
        }
        /* if (images!=null && images !='' && images.indexOf('[') < 0) {
             return '../../assets/images/' + images;
         }*/
        else {
            let filenm = JSON.parse(filename);
          //  console.log('filenm-------------');
           // console.log(filenm);
            return '../../assets/images/uploads/' + filenm[0];
        }
    }
    checktype(servername) {
        let filetype = JSON.parse(servername);
        filetype = filetype.toString();
        filetype = filetype.toLowerCase();
        let val = filetype.split('.');
        return '../../assets/images/' + val[val.length - 1] + '.png';
    }
    justtype(servername) {
        let filetype = JSON.parse(servername);
        filetype = filetype.toString();
        filetype = filetype.toLowerCase();
        let val = filetype.split('.');
        return '../../assets/images/' + val[val.length - 1] + '.png';
    }
    showname(uploadedfilename) {
       /* if (uploadedfilename == null || uploadedfilename=='') {
            return '';
        }
        else {
            let uploadedfilename = JSON.parse(uploadedfilename);
         //   return  uploadedfilename[0];
        }*/
    }
}
