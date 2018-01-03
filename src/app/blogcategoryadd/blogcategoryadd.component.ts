import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-blogcategoryadd',
  templateUrl: './blogcategoryadd.component.html',
  styleUrls: ['./blogcategoryadd.component.css'],
    providers: [Commonservices],
})
export class BlogcategoryaddComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public serverurl;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: [''],
        });
    }
    dosubmit(formval) {
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
            let link = this.serverurl + 'addblogcategory';
            let data = {
                title: formval.title,
                description: formval.description,
                status: formval.status
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.router.navigate(['/blogcategorylist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}