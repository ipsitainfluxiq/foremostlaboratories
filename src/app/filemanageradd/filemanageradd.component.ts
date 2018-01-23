import { Component, OnInit , NgZone, EventEmitter } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-filemanageradd',
  templateUrl: './filemanageradd.component.html',
  styleUrls: ['./filemanageradd.component.css'],
    providers: [Commonservices],
})
export class FilemanageraddComponent implements OnInit {
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

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;

        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit() {
        this.files = [];
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
    dosubmit(formval) {
        let file= formval.servername;
        console.log('file=========');
        console.log(file);
        let sfilename = [];
        let uploadedfilename = [];
        for (let i in file) {
            sfilename.push(file[i].response);
            uploadedfilename.push(file[i].name);
        }
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
        console.log(this.dataForm);
        console.log(this.dataForm.valid);
        if (this.dataForm.valid ) {
            let link = this.serverurl + 'addfile';
            let data = {
                name: formval.name,
                servername: JSON.stringify(sfilename),
                uploadedfilename: JSON.stringify(uploadedfilename),
                description: formval.description,
                status: formval.status,
                priority: formval.priority,
            };
            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.router.navigate(['/filemanagerlist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
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
            /*console.log('files??');
            console.log(this.files);*/
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
    checktype(servername) {
        let filetype = JSON.parse(servername);
        filetype = filetype.toString();
        filetype = filetype.toLowerCase();
        let val = filetype.split('.');
        return '../../assets/images/' + val[val.length - 1] + '.png';
    }
    deleteimage1(counter: any) {
        this.files.splice(counter,1);
    }
}
