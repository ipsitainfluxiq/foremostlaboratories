import { Component, OnInit , NgZone, EventEmitter } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-videomanageradd',
  templateUrl: './videomanageradd.component.html',
  styleUrls: ['./videomanageradd.component.css'],
    providers: [Commonservices],
})
export class VideomanageraddComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public serverurl;
    public showlinkdiv: any;
    public showdivforvideo: any;
    blogmanagementid: number;
    public blogcategorylist: any = [];
    static invalidlink;
    static blanklink;
    static videotype;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute, public _sanitizer: DomSanitizer) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.showlinkdiv = 0;
        this.showdivforvideo = 0;
        VideomanageraddComponent.blanklink = false;
        VideomanageraddComponent.invalidlink = false;
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            videocategory: ['', Validators.required],
            videolink: ['', Validators.compose([Validators.required, VideomanageraddComponent.validateLink])],
        });

        this.route.params.subscribe(params => {
            this.blogmanagementid = params['id'];
        });
       // console.log('?? ' + this.blogmanagementid);
    }
    dosubmit(formval) {
        console.log('VideomanageraddComponent.invalidlink  ' + VideomanageraddComponent.invalidlink );
        console.log('VideomanageraddComponent.blanklink  ' + VideomanageraddComponent.blanklink );
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid &&  (VideomanageraddComponent.invalidlink == false || VideomanageraddComponent.blanklink == false)) {
            let link = this.serverurl + 'addvideomanager';
            let data = {
                title: formval.title,
                description: formval.description,
                videocategory: formval.videocategory,
                videolink: formval.videolink,
                blogmanagementid: this.blogmanagementid,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.router.navigate(['/blogmanagementlist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    checkcategory() {
        if (this.dataForm.value.videocategory != '') {
            this.showlinkdiv = 1 - this.showlinkdiv;
        }
        VideomanageraddComponent.videotype = this.dataForm.value.videocategory;
    }
    goback() {
        this.router.navigate(['/videomanagerlist', this.blogmanagementid]);
    }
    static validateLink(control: FormControl) {
        console.log('videotype ' + VideomanageraddComponent.videotype);
        VideomanageraddComponent.blanklink = false;
        VideomanageraddComponent.invalidlink = false;

        if (control.value == '') {
            VideomanageraddComponent.blanklink = true;
            return {'invalidlink': true};
        }
        if (VideomanageraddComponent.videotype == 1) {
        if (!control.value.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)) {
            VideomanageraddComponent.invalidlink = true;
            return {'invalidlink': true};
        }
        }
        if (VideomanageraddComponent.videotype == 2) {
            if (!control.value.match( /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/)) {
            VideomanageraddComponent.invalidlink = true;
            return {'invalidlink': true};
        }
        }
    }

    getlink(type: any) {
        if (type == 'invalid') {
            return VideomanageraddComponent.invalidlink;
        }
        if (type == 'blank') {
            return VideomanageraddComponent.blanklink;
        }
    }
    videdivopenornot() {
        this.showdivforvideo = 0
        if ((VideomanageraddComponent.invalidlink == false && VideomanageraddComponent.blanklink == false) ) {
          //  console.log('CALL videodivopen');
           this.showdivforvideo = 1 ;
        }
        if ((VideomanageraddComponent.invalidlink == true && VideomanageraddComponent.blanklink == true) ) {
         //   console.log('CALL videodivopen');
           this.showdivforvideo = 0 ;
        }
    }
    videoURL(type) {
        if (type == 1) {
            return this._sanitizer.bypassSecurityTrustResourceUrl(this.dataForm.value.videolink.replace('watch?v=', 'embed/') + '?rel=0');
        }
        if (type == 2) {
            return this._sanitizer.bypassSecurityTrustResourceUrl(this.dataForm.value.videolink.replace('vimeo.com', 'player.vimeo.com/video'));
        }
    }
}
