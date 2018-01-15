import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import * as moment from 'moment';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-doctoradd',
    templateUrl: './doctoradd.component.html',
    styleUrls: ['./doctoradd.component.css'],
    providers: [Commonservices],
})
export class DoctoraddComponent implements OnInit {
    public showdocdiv: any;
    public serverurl: any;
    public state: any = [];
    public dataForm: FormGroup;
    private fb;
    static invalidemail;
    static blankemail;
    private minDate: Date;
    private maxDate: Date;
    private successModal: boolean = false;
    private cookiedetails;
    private addcookie: CookieService;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices, addcookie: CookieService) {
        let now = moment();
        this.fb = fb;
        this.addcookie = addcookie ;
        this.serverurl = _commonservices.url;
        this.showdocdiv = 0;
        DoctoraddComponent.blankemail = false;
        DoctoraddComponent.invalidemail = false;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log(this.cookiedetails.id);

        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                let result1 = res.json();
                for (let i in result1) {
                    this.state[i] = result1[i].name;
                }
            }, error => {
                console.log('Oooops!');
            });
        this.minDate = new Date(2017, 5, 10);
        this.maxDate = new Date(2018, 9, 15);
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            officemanager: [''],
            name_practice: [''],
            email: ['', Validators.compose([Validators.required, DoctoraddComponent.validateEmail])],
            phone: ['', Validators.required],
            cellphone: ['', Validators.required],
            officenumber: ['', Validators.required],
            address: ['', Validators.required],
            address2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            contacttime: [''],
            timezone: ['', Validators.required],
            firstcontact: [''],
            marketingmaterials: [''],
            datepractice: ['']
        });
    }

    static validateEmail(control: FormControl) {
        DoctoraddComponent.blankemail = false;
        DoctoraddComponent.invalidemail = false;

        if (control.value == '') {
            DoctoraddComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            DoctoraddComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    getemail(type: any) {
        if (type == 'invalid') {
            return DoctoraddComponent.invalidemail;
        }
        if (type == 'blank') {
            return DoctoraddComponent.blankemail;
        }
    }

    calldiv(val) {
        if (val == 1) {
            this.showdocdiv = 1;
        }
        if (val == 2) {
            this.showdocdiv = 2;
        }
    }
    onHidden() {
        this.showdocdiv = 0;
        this.successModal = false;
    }

    dosubmit(formval) {
        let dateis = moment(formval.datepractice);
        formval.datepractice = dateis.format('YYYY-MM-DD');

        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid  && (DoctoraddComponent.invalidemail == false || DoctoraddComponent.blankemail == false)) {
            console.log('inside dataformvalid');
            let link = this.serverurl + 'doctoradd';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                officemanager: formval.officemanager,
                name_practice: formval.name_practice,
                email: formval.email,
                phone: formval.phone,
                cellphone: formval.cellphone,
                officenumber: formval.officenumber,
                address: formval.address,
                address2: formval.address2,
                city: formval.city,
                state: formval.state,
                zip: formval.zip,
                contacttime: formval.contacttime,
                timezone: formval.timezone,
                firstcontact: formval.firstcontact,
                marketingmaterials: formval.marketingmaterials,
                datepractice: formval.datepractice,
                ownerid : this.cookiedetails.id
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.successModal = true;
                      //  this.dataForm.reset();
                        this.router.navigate(['/doctorlist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
