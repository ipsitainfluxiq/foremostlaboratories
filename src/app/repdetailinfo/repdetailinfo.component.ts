import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-repdetailinfo',
  templateUrl: './repdetailinfo.component.html',
  styleUrls: ['./repdetailinfo.component.css'],
    providers: [Commonservices],
})
export class RepdetailinfoComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    id: number;
    type: number;
    public serverurl;
    public userdet: any;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
    }

  ngOnInit() {
      this.dataForm = this.fb.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          personal_email: [''],
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
      this.route.params.subscribe(params => {
          this.id = params['id'];
          this.type = params['type'];
      });
      this.getdetailsofrep();

      setTimeout(() => {
      if (this.userdet != null && this.userdet != '') {
        console.log('humm');
        console.log(this.userdet);
          this.dataForm = this.fb.group({
              first_name: [this.userdet.first_name, Validators.required],
              last_name: [this.userdet.last_name, Validators.required],
              personal_email: [this.userdet.personal_email],
              secondary_email: [this.userdet.secondary_email],
              cellphone: [this.userdet.cellphone, Validators.required],
              address: [this.userdet.address, Validators.required],
              city: [this.userdet.city, Validators.required],
              state: [this.userdet.state, Validators.required],
              postal_code: [this.userdet.postal_code, Validators.required],
              best_time: [this.userdet.best_time],
              healthcare_industry_year: [this.userdet.healthcare_industry_year, Validators.required],
              carrer_change: [this.userdet.carrer_change, Validators.required],
              doctor_count: [this.userdet.doctor_count, Validators.required],
              get_started: [this.userdet.get_started, Validators.required],
              additional_info: [this.userdet.additional_info, Validators.required],
              background_info: [this.userdet.background_info, Validators.required],
              greatest_attribute: [this.userdet.greatest_attribute, Validators.required],
          });
      }
      }, 1000);
  }
    getdetailsofrep() {
        let link = this.serverurl + 'representativedetails';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
               // console.log('result is-');
               // console.log(result);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.userdet = result.item;
                }else {
                    //  this.router.navigate(['/doctorlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    disableClass() {
        if (this.type == 0) {
            return '';
        }
        if (this.type == 1) {
            return 'disableclass';
        }
        return '';
    }

    dosubmit(formval) {
        if (this.dataForm.valid) {
            console.log('valid');
            let link= this.serverurl + 'user_info';
            let data = {
                id: this.id,
                first_name: formval.first_name,
                last_name: formval.last_name,
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

            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        if (this.type == 0) {
                            this.router.navigate(['/dashboard']);
                        }
                        if (this.type == 1) {
                            this.router.navigate(['/representativelist']);
                        }
                    }
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
}
