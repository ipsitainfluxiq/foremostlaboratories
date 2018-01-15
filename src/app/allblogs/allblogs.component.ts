import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css'],
    providers: [Commonservices],
})
export class AllblogsComponent implements OnInit {
    public serverurl;
    private addcookie1: CookieService;
    private usertype;
    private orderbyquery;
    private blogmanagementlist;

    constructor( private _http: Http, private router: Router, private _commonservices: Commonservices, addcookie1: CookieService, public _sanitizer: DomSanitizer) {
        this.addcookie1 = addcookie1 ;
        this.usertype = this.addcookie1.getObject('usertype'); // 1 = admin  ,, 0 = representative
        this.serverurl = _commonservices.url;
        console.log('? ' + this.usertype);
        this.orderbyquery = 'datetimestamp';
    }

  ngOnInit() {
      this.getblogmanagementlist();
  }
    getblogmanagementlist() {
        let link = this.serverurl + 'blogmanagementlist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.blogmanagementlist = result.res;
                console.log(this.blogmanagementlist[0]);
            }, error => {
                console.log('Oooops!');
            });
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
}
