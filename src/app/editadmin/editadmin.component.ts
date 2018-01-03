import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-editadmin',
  templateUrl: './editadmin.component.html',
  styleUrls: ['./editadmin.component.css'],
    providers: [Commonservices],
})
export class EditadminComponent implements OnInit {
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
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            phone: ['', Validators.required],

        });
    }


    getdetails() {
        let link = this.serverurl + 'details';
        let data = {_id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    // console.log(result);
                    let userdet = result.item;
                    // console.log(userdet.firstname);
                    // (<FormControl>this.dataForm.controls['id']).setValue(userdet._id);
                    (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.first_name);
                    (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.last_name);
                    (<FormControl>this.dataForm.controls['email']).setValue(userdet.personal_email);
                    (<FormControl>this.dataForm.controls['phone']).setValue(userdet.cellphone);
                    (<FormControl>this.dataForm.controls['address']).setValue(userdet.address);
                    (<FormControl>this.dataForm.controls['city']).setValue(userdet.city);
                    (<FormControl>this.dataForm.controls['state']).setValue(userdet.state);
                    (<FormControl>this.dataForm.controls['zip']).setValue(userdet.postal_code);
                }else {
                    this.router.navigate(['/adminlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {

        this.isSubmit = true;
        if (this.dataForm.valid) {
            let link= this.serverurl + 'editadmin';
            let data = {id: this.id, firstname: formval.firstname, lastname: formval.lastname, phone: formval.phone, address: formval.address, city: formval.city, state: formval.state, zip: formval.zip};
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/adminlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}