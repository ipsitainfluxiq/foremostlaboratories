import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-blogmanagementedit',
  templateUrl: './blogmanagementedit.component.html',
  styleUrls: ['./blogmanagementedit.component.css'],
    providers: [Commonservices],
})
export class BlogmanagementeditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public isSubmit;
    id: number;
    public serverurl;
    public blogcategorylist: any = [];
    private zone: NgZone;
    public basicOptions: Object;
    public progress: number = 0;
    private response: any = {};
    public imagename: any;
    public uploadedfilesrc: any;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
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
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetailsofmanagement();
        });

        this.isSubmit = false;
        this.dataForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            bloglist: ['', Validators.required],
            image: [''],
            status: [''],
            priority: ['', Validators.required]
        });
        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'uploads'
        };
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

    getdetailsofmanagement() {
        this.uploadedfilesrc = '';
        let link = this.serverurl + 'blogmanagementdetails';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result is        -');
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                  //  this.uploadedfilesrc = '../../assets/images/uploads/' + userdet.image;
                    console.log('**********' + userdet.image.replace(/"/g, ''));
                    this.uploadedfilesrc = '../../assets/images/uploads/' +  userdet.image.replace(/"/g, '');
                    this.imagename = userdet.image.replace(/"/g, '');
                    console.log('???????' + this.uploadedfilesrc);
                 //   formval.image = userdet.image.replace(/"/g, '');
                    (<FormControl>this.dataForm.controls['title']).setValue(userdet.title);
                    (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
                    (<FormControl>this.dataForm.controls['bloglist']).setValue(userdet.bloglist);
                    (<FormControl>this.dataForm.controls['status']).setValue(userdet.status);
                    (<FormControl>this.dataForm.controls['priority']).setValue(userdet.priority);
                }else {
                    this.router.navigate(['/blogmanagementlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        if (formval.status == true) {
            formval.status = 1;
        }
        if (formval.status == false) {
            formval.status = 0;
        }
        this.isSubmit = true;
        if (this.dataForm.valid) {
            formval.image = formval.image.replace(/"/g, '');
            let link= this.serverurl + 'editblogmanagement';
            let data = {id: this.id, title: formval.title, description: formval.description, image: formval.image, bloglist: formval.bloglist, status: formval.status, priority: formval.priority};
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/blogmanagementlist']);
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

                   // this.is_error = 1;
                }

            }, error => {
                console.log("Oooops!");
            });


    }


}