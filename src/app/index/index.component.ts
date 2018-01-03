import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
    providers: [Commonservices],
})
export class IndexComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    static invalidemail;
    static blankemail;
    private isModalShown: boolean = false;
    public serverurl;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        IndexComponent.blankemail = false;
        IndexComponent.invalidemail = false;
    }
  ngOnInit() {
      this.dataForm = this.fb.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          personal_email: ['', Validators.compose([Validators.required, IndexComponent.validateEmail])],
          secondary_email: [''],
          cellphone: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          postal_code: ['', Validators.required],
          best_time: [''],
          healthcare_industry_year: ['', Validators.required],
          carrer_change: ['', Validators.required],
          doctor_count: ['', Validators.required],
          get_started: ['', Validators.required],
          additional_info: ['', Validators.required],
          background_info: ['', Validators.required],
          greatest_attribute: ['', Validators.required],
      });
  }

    static validateEmail(control: FormControl) {
        IndexComponent.blankemail = false;
        IndexComponent.invalidemail = false;

        if (control.value == '') {
            IndexComponent.blankemail = true;
            return { 'invalidemail' : true } ;
        }
        if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            IndexComponent.invalidemail = true;
            return { 'invalidemail': true };
        }
    }

    getemail(type: any)  {
        if (type == 'invalid') {
            return IndexComponent.invalidemail;
        }
        if (type == 'blank') {
            return IndexComponent.blankemail;
        }
    }
    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid && (IndexComponent.invalidemail == false || IndexComponent.blankemail == false)) {
            console.log('inside dataformvalid');
             // let link = 'http://localhost:3010/user_info';
            let link = this.serverurl + 'user_info';
            let data = {
                first_name: formval.first_name,
                last_name: formval.last_name,
                personal_email: formval.personal_email,
                secondary_email: formval.secondary_email,
                cellphone: formval.cellphone,
                address: formval.address,
                city: formval.city,
                state: formval.state,
                postal_code: formval.postal_code,
                best_time: formval.best_time,
                healthcare_industry_year: formval.healthcare_industry_year,
                carrer_change: formval.carrer_change,
                doctor_count: formval.doctor_count,
                get_started: formval.get_started,
                additional_info: formval.additional_info,
                background_info: formval.background_info,
                greatest_attribute: formval.greatest_attribute,
                add_time: this.getdate(),
            };
            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.isModalShown = true;
                    }
                    this.router.navigate(['/']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    getdate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let today1 = yyyy + '-' + mm + '-' + dd;
        console.log(today1);
        return today1;
    }
    onHidden() {
        this.isModalShown = false;
    }
}
