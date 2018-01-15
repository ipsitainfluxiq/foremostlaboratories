import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

import * as moment from 'moment';

@Component({
  selector: 'app-doctoredit',
  templateUrl: './doctoredit.component.html',
  styleUrls: ['./doctoredit.component.css'],
    providers: [Commonservices],
})
export class DoctoreditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    id: number;
    public serverurl;
    public blogcategorylist: any = [];
    public isSubmit;
    private minDate: Date;
    private maxDate: Date;
    public state: any = [];

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        let now = moment();
      //  now.format('yyyy-mm-dd');
        this.fb = fb;
        this.serverurl = _commonservices.url;
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
        this.isSubmit = false;
        this.dataForm = this.fb.group({
            firstname: [''],
            lastname: [''],
            officemanager: [''],
            name_practice: [''],
            email: [''],
            phone: [''],
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
      this.route.params.subscribe(params => {
          this.id = params['id'];
          console.log(this.id);
          this.getdetailsofdoctor();
      });
  }
    getdetailsofdoctor() {
        let link = this.serverurl + 'doctordetails';
        let data = {id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result is-');
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    console.log(userdet.datepractice);
                    let dateis = moment(userdet.datepractice);
                    console.log('/////////');
                    console.log(dateis.format());
                    //  console.log(dateis.format('YYYY-MM-DD'));
                  //  formval.datepractice = dateis.format('YYYY-MM-DD');

                    (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.firstname);
                    (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.lastname);
                    (<FormControl>this.dataForm.controls['officemanager']).setValue(userdet.officemanager);
                    (<FormControl>this.dataForm.controls['name_practice']).setValue(userdet.name_practice);
                    (<FormControl>this.dataForm.controls['email']).setValue(userdet.email);
                    (<FormControl>this.dataForm.controls['phone']).setValue(userdet.phone);
                    (<FormControl>this.dataForm.controls['cellphone']).setValue(userdet.cellphone);
                    (<FormControl>this.dataForm.controls['officenumber']).setValue(userdet.officenumber);
                    (<FormControl>this.dataForm.controls['address']).setValue(userdet.address);
                    (<FormControl>this.dataForm.controls['address2']).setValue(userdet.address2);
                    (<FormControl>this.dataForm.controls['city']).setValue(userdet.city);
                    (<FormControl>this.dataForm.controls['state']).setValue(userdet.state);
                    (<FormControl>this.dataForm.controls['zip']).setValue(userdet.zip);
                    (<FormControl>this.dataForm.controls['contacttime']).setValue(userdet.contacttime);
                    (<FormControl>this.dataForm.controls['timezone']).setValue(userdet.timezone);
                    (<FormControl>this.dataForm.controls['firstcontact']).setValue(userdet.firstcontact);
                    (<FormControl>this.dataForm.controls['marketingmaterials']).setValue(userdet.marketingmaterials);
                    (<FormControl>this.dataForm.controls['datepractice']).setValue(dateis.format());
                }else {
                  //  this.router.navigate(['/doctorlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
    dosubmit(formval) {
        console.log(formval.datepractice);
        let dateis = moment(formval.datepractice);
      //  console.log(dateis.format('YYYY-MM-DD'));
        formval.datepractice = dateis.format('YYYY-MM-DD');

             this.isSubmit = true;
        console.log('?');
        if (this.dataForm.valid) {
            console.log('valie');
            let link= this.serverurl + 'doctoredit';
            let data = {id: this.id, officemanager: formval.officemanager, name_practice: formval.name_practice, cellphone: formval.cellphone, officenumber: formval.officenumber, address: formval.address, address2: formval.address2, city: formval.city, state: formval.state, zip: formval.zip, contacttime: formval.contacttime, timezone: formval.timezone, firstcontact: formval.firstcontact, marketingmaterials: formval.marketingmaterials, datepractice: formval.datepractice};

            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/doctorlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
