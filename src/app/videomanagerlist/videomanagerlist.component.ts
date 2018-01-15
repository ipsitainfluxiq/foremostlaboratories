import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-videomanagerlist',
  templateUrl: './videomanagerlist.component.html',
  styleUrls: ['./videomanagerlist.component.css'],
    providers: [Commonservices],
})
export class VideomanagerlistComponent implements OnInit {
    blogmanagementid: number;
    public serverurl;
    public datalist;
    private isModalShown: boolean = false;
    private Modalvideo: boolean = false;
    public id;
    public safeurl;

    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public thumbnil;
    public list_length;
    orderbyquery: any;
    orderbytype: any;

  constructor(private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer) {
      this.serverurl = _commonservices.url;
      this.showrows = 5;
      this.pageno = 1;
      this.pagestart = 0;
      this.pageinitation = 5;
      this.orderbyquery = 'title';
      this.orderbytype = 1;
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.blogmanagementid = params['id'];
      });
      this.getdetails();
  }
    getdetails() {
        let link = this.serverurl + 'videomanagerdetails';
        let data = {blogmanagementid : this.blogmanagementid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result++++++++');
                this.datalist = result.item;
                console.log(this.datalist);
                this.list_length = result.item.length;
                this.totalpage = this.list_length / this.showrows ;
                if (this.totalpage != parseInt(this.totalpage)) {   // it means if the totalpage is 1.4 or any values that is not round number
                    this.totalpage = parseInt(this.totalpage) + 1;
                }
            }, error => {
                console.log('Ooops');
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

    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
    }
    onHidden() {
        this.isModalShown = false;
        this.Modalvideo = false;
    }

    videodel() {
        this.isModalShown = false;
        let link = this.serverurl + 'deletevideomanager';
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
            this.getdetails();
        }, 300);
    }
   /* thumblincreate(l) {
        console.log('call');
    }*/
    thumblincreate(link) {
        var str = link.indexOf('youtube.com');

        if (str != -1) { // this is for youtube
            var thumb = this.getParameterByName(link, 'v', 1), url = 'http://img.youtube.com/vi/' + thumb + '/hqdefault.jpg';
            this.thumbnil = url;
            return this._sanitizer.bypassSecurityTrustResourceUrl(this.thumbnil);
        }
        if (str == -1) { // vimeo
            var thumb = this.getParameterByName(link, 'v', 2);
            console.log(thumb);
            this.thumbnil = 'http://the-webdevelopers.com/getvimeoid.php?id=' + thumb;
         //   return this._sanitizer.bypassSecurityTrustResourceUrl(thumb);
            return this.thumbnil;
        }
    }

    getParameterByName(url, name, type) {
        if (type == 1) { // youtube
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(url);
            var a = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            return a;
        }
        if (type == 2) { // vimeo
            var regExp = /(http:\/\/|https:\/\/)?(www\.)?vimeo.com\/(\d+)(\/)?(#.*)?/;
            var match = url.match(regExp);
            if (match) {
                //  console.log(match);
                return match[3];
               // console.log('call');
              //  return this.getvimeoid(match[3]);
                //  var url = "http://vimeo.com/api/v2/video/" + match[3] + ".json?callback=showThumb";
                // http://foremostlaboratories.com/getvimeoid.php?id=248996255
            }
        }
    }
/*    getvimeoid(id) {
        console.log('calleddd');
        let link = 'http://foremostlaboratories.com/getvimeoid.php?id=' + id;
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log('result from phppppppppppppppp');
                console.log(result);
                return result;
            }, error => {
                console.log('Oooops!');
            });
    }*/

    showvideopopup(videolink) {
        var str = videolink.indexOf('youtube.com');
        this.Modalvideo = true;
        if (str != -1) {
            this.safeurl = this._sanitizer.bypassSecurityTrustResourceUrl(videolink.replace('watch?v=', 'embed/') + '?rel=0');
        }
        if (str == -1) {
            this.safeurl = this._sanitizer.bypassSecurityTrustResourceUrl(videolink.replace('vimeo.com', 'player.vimeo.com/video'));
        }
    }
}