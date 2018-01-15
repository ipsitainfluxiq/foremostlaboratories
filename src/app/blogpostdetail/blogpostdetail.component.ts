import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-blogpostdetail',
  templateUrl: './blogpostdetail.component.html',
  styleUrls: ['./blogpostdetail.component.css'],
    providers: [Commonservices],
})
export class BlogpostdetailComponent implements OnInit {
    public serverurl;
    id: number;
    public blogmanagement_videomanagement_list;
    public blogmanagementlist;
    public videomanagementlist;
    public arr=[];

    constructor(private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer) {
        this.serverurl = _commonservices.url;
        this.arr=[];
    }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.id = params['id'];
      });
    //  this.getblogmanagement_videomanagement_list();
      this.getblogmanagement();
      this.getvideomanagement();
  }
    getblogmanagement_videomanagement_list() {
        let link = this.serverurl + 'blogmanagement_videomanagement_list';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.blogmanagement_videomanagement_list = result.res;
                console.log(this.blogmanagement_videomanagement_list);
            }, error => {
                console.log('Oooops!');
            });
    }

    getblogmanagement() {
        let link = this.serverurl + 'getblogmanagement';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.blogmanagementlist = result.res;
                console.log(this.blogmanagementlist);
                this.callit(this.blogmanagementlist.image);
            }, error => {
                console.log('Oooops!');
            });
    }
    getvideomanagement() {
        let link = this.serverurl + 'getvideomanagement';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.videomanagementlist = result.res;
                console.log(this.videomanagementlist);
            }, error => {
                console.log('Oooops!');
            });
    }
    callit(images) {
      //  console.log(images);
        if (images == null || images=='') {
            return '../../assets/images/logo.png';
        }
        else {
            let img = JSON.parse(images);
            console.log('img000000');
            console.log(img);
           // return '../../assets/images/uploads/' + img[0];
            for (let i in img) {
                this.arr.push('../../assets/images/uploads/' + img[i]);
            }
            console.log(this.arr);
        }
    }
    showvideo(videolink) {
        var str = videolink.indexOf('youtube.com');
        if (str != -1) {
            return this._sanitizer.bypassSecurityTrustResourceUrl(videolink.replace('watch?v=', 'embed/') + '?rel=0');
        }
        if (str == -1) {
            return  this._sanitizer.bypassSecurityTrustResourceUrl(videolink.replace('vimeo.com', 'player.vimeo.com/video'));
        }
    }
}
