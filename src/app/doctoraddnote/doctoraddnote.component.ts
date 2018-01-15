import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import * as moment from 'moment';

@Component({
  selector: 'app-doctoraddnote',
  templateUrl: './doctoraddnote.component.html',
  styleUrls: ['./doctoraddnote.component.css'],
    providers: [Commonservices]
})
export class DoctoraddnoteComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    docid: number;
    public serverurl;
    public isSubmit;
    private cookiedetails;
    private timestamp: any;
    private addcookie: CookieService;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, addcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
    }

  ngOnInit() {
      this.dataForm = this.fb.group({
          note: ['', Validators.required]
      });

      this.route.params.subscribe(params => {
          this.docid = params['id'];
          console.log(this.docid);
      });
  }

    dosubmit(formval) {
        let today = new Date();
        let dateis = moment(today);
        this.timestamp = dateis.format('YYYY-MM-DD');

        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }

        if (this.dataForm.valid) {
            console.log('inside dataformvalid');
            let link = this.serverurl + 'doctoraddnote';
            let data = {
                docid: this.docid,
                note: formval.note,
                timestamp: this.timestamp,
                ownerid : this.cookiedetails.id
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.router.navigate(['/doctorlist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
