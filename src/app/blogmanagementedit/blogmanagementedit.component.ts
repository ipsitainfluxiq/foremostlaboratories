import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

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
    public disableuploader : any = 0;
    id: number;
    public serverurl;
    public imagetobesubmited: any;
    public blogcategorylist: any = [];
    private zone: NgZone;
    public basicOptions: Object;
    public progress: number = 0;
    private issegmentmodalshown: boolean = false;

    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

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
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
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
            url: this.serverurl + 'uploads',
            filterExtensions: false,
            allowedExtensions: ['jpg', 'png','jpeg']
        };
    }

    getdetailsofmanagement() {
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
                  //  console.log('**********' + userdet.image.replace(/"/g, ''));
                  //  this.uploadedfilesrc = '../../assets/images/uploads/' +  userdet.image.replace(/"/g, '');
                 //   this.imagename = userdet.image.replace(/"/g, '');
                  //  console.log('???????' + this.uploadedfilesrc);
                 //   formval.image = userdet.image.replace(/"/g, '');
                    (<FormControl>this.dataForm.controls['title']).setValue(userdet.title);
                    (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
                    (<FormControl>this.dataForm.controls['bloglist']).setValue(userdet.bloglist);
                    (<FormControl>this.dataForm.controls['image']).setValue(userdet.image);
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
        let img= formval.image;
        console.log(img);
        let arrimage = [];
        if (typeof(img) == 'object') {  // newly added images
            for (let i in img) {
                arrimage.push(img[i].response);
            }
            this.imagetobesubmited = JSON.stringify(arrimage); // as this is an object we have to stringfy it
        }
        else {
            arrimage = img;      // prev image remains
            this.imagetobesubmited = arrimage;
        }

        if (formval.status == true) {
            formval.status = 1;
        }
        if (formval.status == false) {
            formval.status = 0;
        }
        this.isSubmit = true;
        if (this.dataForm.valid) {
            let link= this.serverurl + 'editblogmanagement';
            let data = {
                id: this.id,
                title: formval.title,
                description: formval.description,
                image: this.imagetobesubmited,
                bloglist: formval.bloglist,
                status: formval.status,
                priority: formval.priority
            };
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
                  //  this.uploadedfilesrc = '';
                    this.progress = 0;

                   // this.is_error = 1;
                }

            }, error => {
                console.log("Oooops!");
            });


    }
    callimagesegment() {
        console.log('callllllllllll');
        this.issegmentmodalshown = true;
    }
    callit(images) {
        console.log(images);
        // console.log(JSON.parse(images));
        if (images.value == null || images.value=='') {
            return '../../assets/images/logo.png';
        }
        /* if (images!=null && images !='' && images.indexOf('[') < 0) {
             return '../../assets/images/' + images;
         }*/
        else {
            let img = JSON.parse(images.value);
            console.log('img-------------');
            console.log(img);
            //  return img[1];
            return '../../assets/images/uploads/' + img[0];
        }
    }
    /*onUploadOutput(output: UploadOutput): void {  // WRONG
        if (output.type === 'allAddedToQueue') {
            setTimeout(()=> {
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: this.serverurl + 'uploads',
                    method: 'POST',
                };
                this.uploadInput.emit(event);
                this.disableuploader = 1;
            },2000);
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
            setTimeout(()=> {
                console.log('output.file-------------------');
                console.log(output.file);
                this.files.push(output.file);
                this.disableuploader = 0;
                console.log(this.files);
                console.log('this.files');
                console.log(this.files);
            },2000);
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            console.log(this.files);
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
    }*/
    onUploadOutput(output: UploadOutput): void {
        setTimeout(()=> {
            // alert(8);
            if (output.type === 'allAddedToQueue') { // when all files added in queue
                // uncomment this if you want to auto upload files when added
                this.disableuploader = 1;
                console.log('this.disableuploader === before');
                console.log(this.disableuploader);
                setTimeout(()=> {
                    const event: UploadInput = {
                        type: 'uploadAll',
                        url: this.serverurl + 'uploads',
                        // url: 'http://ngx-uploader.com/upload',
                        method: 'POST',
                        // data: {foo: output.file}
                    };
                    this.uploadInput.emit(event);

                },200);
            } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added

                setTimeout(()=> {    // <<<---    using ()=> syntax

                    console.log('output.file[0].response');
                    console.log(output.file.response);
                    console.log(output.file);
                    console.log(output.file);
                    // this.files.push(output.file);

                    if(output.file.response!="") {
                        // alert(7);
                        console.log('output.file-------------------');
                        console.log(output.file);
                        console.log(output.file.response);
                        // console.log(output.file[0].response);
                        this.files.push(output.file);
                    }
                    this.disableuploader = 0;
                    console.log('this.disableuploader after');
                    console.log(this.disableuploader);
                    // alert(22);
                    console.log(this.files);
                    console.log('this.files');
                    console.log(this.files);
                    // alert(55);
                    //  console.log(output.file[0].response);
                },300);
            } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
                // alert(9);
                console.log(this.files);
                // update current data in files array for uploading file
                const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
                this.files[index] = output.file;
            } else if (output.type === 'removed') {
                // remove file from array when removed
                this.files = this.files.filter((file: UploadFile) => file !== output.file);
            } else if (output.type === 'dragOver') {
                this.dragOver = true;
            } else if (output.type === 'dragOut') {
                this.dragOver = false;
            } else if (output.type === 'drop') {
                this.dragOver = false;
            }
            /*console.log('files??');
            console.log(this.files);*/
        },200);
    }
    startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: 'http://ngx-uploader.com/upload',
            method: 'POST',
            data: { foo: 'bar' }
        };
        this.uploadInput.emit(event);
    }

    saveimages() {
        console.log('this.files00000000');
        console.log(this.files);
        this.dataForm.patchValue({image: this.files});
        this.issegmentmodalshown = false;
       // this.dataForm.controls['image'] = '';
    }
    deleteimage1(counter: any) {
        this.files.splice(counter,1);
    }
}