import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-videomanageredit',
  templateUrl: './videomanageredit.component.html',
  styleUrls: ['./videomanageredit.component.css'],
    providers: [Commonservices],
})
export class VideomanagereditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public isSubmit;
    id: number;
    public serverurl;
    public showlinkdiv;
    public blogcategorylist: any = [];
    static invalidlink;
    static blanklink;
    static videotype;
    public showdivforvideo: any;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.showlinkdiv = 0;
        VideomanagereditComponent.blanklink = false;
        VideomanagereditComponent.invalidlink = false;
        this.showdivforvideo = 0;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetailsofmanagement();
        });

        this.isSubmit = false;
        this.dataForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            videocategory: ['', Validators.required],
            videolink: ['', Validators.compose([Validators.required, VideomanagereditComponent.validateLink])],
        });
    }

    getdetailsofmanagement() {
        let link = this.serverurl + 'videomanagerdetailsofparticularvalue';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result is -');
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    if (userdet.videocategory != '') {
                        this.showlinkdiv = 1 - this.showlinkdiv;
                    }
                    VideomanagereditComponent.videotype = userdet.videocategory;
                    if ((userdet.videolink != null) && (typeof(userdet.videolink) != 'undefined')) {
                        this.showdivforvideo = 1 ;
                    }
                    if ((userdet.videolink == null) && (typeof(userdet.videolink) == 'undefined')) {
                        this.showdivforvideo = 0 ;
                    }
                    (<FormControl>this.dataForm.controls['title']).setValue(userdet.title);
                    (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
                    (<FormControl>this.dataForm.controls['videocategory']).setValue(userdet.videocategory);
                    (<FormControl>this.dataForm.controls['videolink']).setValue(userdet.videolink);
                }
                else {
                    this.router.navigate(['/videomanagerlist', this.id]);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        console.log(VideomanagereditComponent.invalidlink);
        console.log(VideomanagereditComponent.blanklink);
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        this.isSubmit = true;
        if (this.dataForm.valid &&  (VideomanagereditComponent.invalidlink == false || VideomanagereditComponent.blanklink == false)) {
            let link= this.serverurl + 'editvideomanager';
            let data = {id: this.id, title: formval.title, description: formval.description, videocategory: formval.videocategory, videolink: formval.videolink};
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/blogmanagementlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    checkcategory() {
        if (this.dataForm.value.videocategory != '') {
            this.showlinkdiv = 1 - this.showlinkdiv;
        }
        VideomanagereditComponent.videotype = this.dataForm.value.videocategory;
    }
    static validateLink(control: FormControl) {
        console.log('videotype ' + VideomanagereditComponent.videotype);
        VideomanagereditComponent.blanklink = false;
        VideomanagereditComponent.invalidlink = false;

        if (control.value == '') {
            VideomanagereditComponent.blanklink = true;
            return {'invalidlink': true};
        }
        if (VideomanagereditComponent.videotype == 1) {
            if (!control.value.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)) {
                VideomanagereditComponent.invalidlink = true;
                return {'invalidlink': true};
            }
        }
        if (VideomanagereditComponent.videotype == 2) {
            console.log(control.value);
            console.log('call');
            if (!control.value.match( /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/)) {
                console.log('not matched');
                VideomanagereditComponent.invalidlink = true;
                return {'invalidlink': true};
            }
        }
    }

    getlink(type: any) {
        // console.log('t '+type);
        console.log('getlink '+ VideomanagereditComponent.invalidlink);
        if (type == 'invalid') {
            return VideomanagereditComponent.invalidlink;
        }
        if (type == 'blank') {
            return VideomanagereditComponent.blanklink;
        }
    }

    videdivopenornot() {
        this.showdivforvideo = 0
        if ((VideomanagereditComponent.invalidlink == false && VideomanagereditComponent.blanklink == false) ) {
            console.log('CALL videodivopen');
            this.showdivforvideo = 1 ;
        }
        if ((VideomanagereditComponent.invalidlink == true && VideomanagereditComponent.blanklink == true) ) {
            console.log('CALL videodivopen');
            this.showdivforvideo = 0 ;
        }
    }
    videoURL(type) {
        if (type == 1) {
            return this._sanitizer.bypassSecurityTrustResourceUrl(this.dataForm.value.videolink.replace('watch?v=', 'embed/') + '?rel=0');
        }
        if (type == 2) {
            return this._sanitizer.bypassSecurityTrustResourceUrl(this.dataForm.value.videolink.replace('https://vimeo.com', 'https://player.vimeo.com/video'));
        }
    }
}
