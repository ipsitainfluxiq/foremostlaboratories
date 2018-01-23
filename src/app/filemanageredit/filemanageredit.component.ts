import { Component, OnInit , NgZone, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-filemanageredit',
  templateUrl: './filemanageredit.component.html',
  styleUrls: ['./filemanageredit.component.css'],
    providers: [Commonservices],
})
export class FilemanagereditComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public serverurl;
    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    private zone: NgZone;
    public disableuploader: any = 0;
    public basicOptions: Object;
    id: number;
    public parsefile: any;
    public filedetail: any;
    public objectoffile: any;
    public filetobesubmited: any;


    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetailsoffile();
        });
        this.dataForm = this.fb.group({
            name: ['', Validators.required],
            servername: [''],
            description: ['', Validators.required],
            status: [''],
            priority: ['', Validators.required]
        });

        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'uploads',
            filterExtensions: false,
            allowedExtensions: ['doc', 'docx', 'xml', 'txt', 'pdf', 'csv', 'html']
        };
    }

    getdetailsoffile() {
        let link = this.serverurl + 'filedetails';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result is  -');
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.parsefile = JSON.parse(userdet.servername);
                    for (let i in this.parsefile) {
                        this.filedetail = this.parsefile[i];
                        this.objectoffile = {
                            response: this.filedetail
                        };
                        this.files.push(this.objectoffile);
                    }
                    console.log(this.files);
                    (<FormControl>this.dataForm.controls['name']).setValue(userdet.name);
                    (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
                    (<FormControl>this.dataForm.controls['servername']).setValue(userdet.servername);
                    (<FormControl>this.dataForm.controls['status']).setValue(userdet.status);
                    (<FormControl>this.dataForm.controls['priority']).setValue(userdet.priority);
                }else {
                    this.router.navigate(['/filemanagerlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
    dosubmit(formval) {
        let file= formval.servername;
        console.log(file);
        let sfilename = [];
        let uploadedfilename = [];
        if (typeof(file) == 'object') {  // newly added images
            for (let i in file) {
                sfilename.push(file[i].response);
                uploadedfilename.push(file[i].name);
            }
            this.filetobesubmited = JSON.stringify(sfilename); // as this is an object we have to stringfy it
        }
        else {
            sfilename = file;      // prev image remains
            uploadedfilename = file;
            this.filetobesubmited = sfilename;
        }
        console.log('uploadedfilename---------');
        console.log(uploadedfilename);
        if (formval.status == true) {
            formval.status = 1;
        }
        if (formval.status == false) {
            formval.status = 0;
        }
        if (this.dataForm.valid) {
            let link= this.serverurl + 'editfilemanager';
            let data = {
                id: this.id,
                name: formval.name,
                servername: JSON.stringify(sfilename),
                uploadedfilename: JSON.stringify(uploadedfilename),
                description: formval.description,
                status: formval.status,
                priority: formval.priority,
            };
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/filemanagerlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }


    callit(filename) {
        console.log(filename);
        if (filename == null || filename=='') {
            return '';
        }
        else {
            let filenm = JSON.parse(filename);
            console.log('filenm-------------');
            console.log(filenm);
            return '../../assets/images/uploads/' + filenm[0];
        }
    }

    onUploadOutput(output: UploadOutput): void {
        setTimeout(()=> {
            // alert(8);
            if (output.type === 'allAddedToQueue') { // when all files added in queue
                // uncomment this if you want to auto upload files when added
                this.disableuploader = 1;
                console.log('this.disableuploader === before');
                console.log(this.disableuploader);
                //  setTimeout(()=> {
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: this.serverurl + 'uploads',
                    method: 'POST',
                };
                this.uploadInput.emit(event);
                //   },200);
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
            this.dataForm.patchValue({servername: this.files});
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
    deleteimage1(counter: any) {
        this.files.splice(counter,1);
    }
}
