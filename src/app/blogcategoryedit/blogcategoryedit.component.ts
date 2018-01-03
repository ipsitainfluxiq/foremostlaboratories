import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-blogcategoryedit',
  templateUrl: './blogcategoryedit.component.html',
  styleUrls: ['./blogcategoryedit.component.css'],
    providers: [Commonservices],
})
export class BlogcategoryeditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public isSubmit;
    id: number;
    public serverurl;


    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetails();
        });

        this.isSubmit = false;
        this.dataForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['']
        });
    }


    getdetails() {
        let link = this.serverurl + 'blogcategorydetails';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    // console.log(result);
                    let userdet = result.item;
                    (<FormControl>this.dataForm.controls['title']).setValue(userdet.title);
                    (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
                    (<FormControl>this.dataForm.controls['status']).setValue(userdet.status);
                }else {
                    this.router.navigate(['/blogcategorylist']);
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
            let link= this.serverurl + 'editblogcategory';
            let data = {id: this.id, title: formval.title, description: formval.description, status: formval.status};
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/blogcategorylist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}