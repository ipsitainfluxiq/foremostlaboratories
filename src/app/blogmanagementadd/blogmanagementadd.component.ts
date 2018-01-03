import { Component, OnInit , NgZone } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
@Component({
  selector: 'app-blogmanagementadd',
  templateUrl: './blogmanagementadd.component.html',
  styleUrls: ['./blogmanagementadd.component.css'],
    providers: [Commonservices],
})
export class BlogmanagementaddComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public serverurl;
  //  public ckeditorContent:any;
    public blogcategorylist: any = [];
    private zone: NgZone;
  //  private zone1: NgZone;
    public basicOptions: Object;
  //  public basicOptions1: Object;
    public progress: number = 0;
  //  public progress1: number = 0;
    private response: any = {};
  //  private response1: any = {};
    public uploadedfilesrc: any;
  //  public uploadedfilesrc1: any;
    public imagename: any;
  //  public videoname: any;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        let link = this.serverurl + 'blogcategorylist';
        this._http.get(link)
            .subscribe(res => {
                var result1 = res.json();
                for (let i in result1.res) {
                    this.blogcategorylist[i] = result1.res[i];
                }
            }, error => {
                console.log("Oooops!");
            });
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            bloglist: ['', Validators.required],
            status: [''],
            image: [''],
          //  video: [''],
            priority: ['', Validators.required],
        });
     //   this.ckeditorContent = '';
        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'uploads'
        };
    // this.zone1 = new NgZone({enableLongStackTrace: false});
     /*   this.basicOptions1 = {
            url: this.serverurl + 'uploads1'
        };*/
    }
    handleUpload(data: any): void // uploading the images and saving to particular folder
    {
        console.log('hi');
        console.log(data);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent;
            console.log(data.progress.percent);
            if (data.progress.percent == 100) {
                let resp = data.response;
                console.log('resp-----');
                console.log((resp));
                console.log(typeof(resp));
                if (typeof(resp) != 'undefined') {
                    let result = (data.response);
                    console.log('result');
                    console.log(result);
                    if (result.length > 1) {
                        this.dataForm.patchValue({image: result});
                        this.uploadedfilesrc = 'assets/images/uploads/' + resp.replace(/"/g, '');
                        console.log('upload file location' + this.uploadedfilesrc);
                        this.imagename = result.replace(/"/g, '');
                        console.log('imagename');
                        console.log(this.imagename);
                    }
                }
            }
        });
    }

  /*  handleUpload1(data: any): void // uploading the images and saving to particular folder
    {
        console.log('hi');
        console.log(data);
        this.zone.run(() => {
            this.response1 = data;
            this.progress1 = data.progress.percent;
            console.log(data.progress.percent);
            if (data.progress.percent == 100) {
                let resp = data.response;
                console.log('resp-----');
                console.log((resp));
                console.log(typeof(resp));
                if (typeof(resp) != 'undefined') {
                    let result = (data.response);
                    console.log('result');
                    console.log(result);
                    if (result.length > 1) {
                        this.dataForm.patchValue({video: result});
                        this.uploadedfilesrc = 'assets/videos/uploads/' + resp.replace(/"/g, '');
                        console.log('upload file location' + this.uploadedfilesrc);
                        this.videoname = result.replace(/"/g, '');
                        console.log('videoname');
                        console.log(this.videoname);
                    }
                }
            }
        });
    }*/
   /* onChange(event:any) {
        this.dataForm.patchValue({description: this.ckeditorContent});
    }
*/

    dosubmit(formval) {
        formval.image = formval.image.replace(/"/g, '');
        if (formval.status == true) {
            formval.status = 1;
        }
        if (formval.status == false) {
            formval.status = 0;
        }
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
       /* console.log(this.dataForm.valid);
        console.log(this.dataForm.controls['description'].touched);
        console.log(this.dataForm.controls['description'].valid);*/
        if (this.dataForm.valid ) {
            let link = this.serverurl + 'addblogmanagement';
            let data = {
                title: formval.title,
                description: formval.description,
                bloglist: formval.bloglist,
                image: formval.image,
               // video: formval.video,
                status: formval.status,
                priority: formval.priority
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
    deleteimage(imagename: any) {
        console.log(imagename);
        var link = this.serverurl + 'deleteimage';
        // var link ='http://influxiq.com:3001/deleteimage';
        var data = {id: '', image: imagename};
        // console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                var result = res.json();
                // var result = res;
                if (result.status == 'success') {
                    console.log('Image Deleted');
                    this.uploadedfilesrc = '';
                    this.progress = 0;

                  //  this.is_error = 1;
                }

            }, error => {
                console.log("Oooops!");
            });


    }
}