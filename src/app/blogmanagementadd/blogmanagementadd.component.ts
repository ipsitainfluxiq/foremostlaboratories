import { Component, OnInit , NgZone, EventEmitter } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import * as moment from 'moment';

@Component({
  selector: 'app-blogmanagementadd',
  templateUrl: './blogmanagementadd.component.html',
  styleUrls: ['./blogmanagementadd.component.css'],
    providers: [Commonservices],
})
export class BlogmanagementaddComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public disableuploader : any = 0;
    public serverurl;
    public blogcategorylist: any = [];
    private zone: NgZone;
    public basicOptions: Object;
    public progress: number = 0;
    private response: any = {};
    public uploadedfilesrc: any;
    public imagename: any;
    public val: any = [];
    options: UploaderOptions;
    //  formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    private issegmentmodalshown: boolean = false;

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

        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit() {
        this.files = [];
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
            url: this.serverurl + 'uploads',
            filterExtensions: false,
            allowedExtensions: ['jpg', 'png','jpeg']
        };
    }
    deleteimage1(counter: any) {
        // alert(6);
        this.files.splice(counter,1);
        // alert(35);
    }
 /*   handleUpload(data: any): void // uploading the images and saving to particular folder
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
    }*/

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
        console.log(formval.image);
        let img= formval.image;
        let arrimage = [];
       for (let i in img) {
            arrimage.push(img[i].response);
        }
        console.log('arrimage7');
        console.log(arrimage);
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

        if (this.dataForm.valid ) {
            let link = this.serverurl + 'addblogmanagement';
            let data = {
                title: formval.title,
                description: formval.description,
                bloglist: formval.bloglist,
                image: JSON.stringify(arrimage), // as this is an object we have to stringfy it
                status: formval.status,
                priority: formval.priority,
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
        this._http.post(link, data)
            .subscribe(res => {
                var result = res.json();
                if (result.status == 'success') {
                    console.log('Image Deleted');
                    this.uploadedfilesrc = '';
                    this.progress = 0;
                }

            }, error => {
                console.log("Oooops!");
            });
    }
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
               // console.log(this.files);
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
    }
    callimagesegment() {
        console.log('callllllllllll');
        this.issegmentmodalshown = true;
    }
}