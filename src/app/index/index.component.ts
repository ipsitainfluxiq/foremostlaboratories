import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import { Ng2ScrollableDirective } from 'ng2-scrollable';
import { scrollTo } from 'ng2-utils';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
    providers: [Commonservices, FooterComponent, HeaderComponent],
})
export class IndexComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    val: number;
    private showlinks;
    static invalidemail;
    static blankemail;
    private isModalShown: boolean = false;
    public serverurl;
    private addcookie: CookieService;
    private addcookie2: CookieService;
    private cookiedetails;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices, addcookie: CookieService, addcookie2: CookieService,  private route: ActivatedRoute, public headercomponent: HeaderComponent, public footercomponent: FooterComponent) {
       // this.showlinks = 0;
        this.fb = fb;
        this.serverurl = _commonservices.url;
        IndexComponent.blankemail = false;
        IndexComponent.invalidemail = false;
        this.addcookie = addcookie;
        this.addcookie2 = addcookie2;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
       // this.showlinks = this.addcookie2.getObject('showlinks');
      /*  if (typeof(this.cookiedetails) == 'undefined') {
            this.showlinks = 0;
        }
        else{
            this.showlinks = 1;
        }*/
        // console.log('showlinks'+this.showlinks);
    }


    scrollTo(selector, parentSelector, h=false) {
        // alert(6);
        scrollTo(
            selector,       // scroll to this
            parentSelector, // scroll within (null if window scrolling)
            h,     // is it horizontal scrolling
            9               // distance from top or left
        );
    }

    scrollEvent(e){
        console.log('e',e);
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
      this.route.params.subscribe(params => {
          this.val = params['scroll'];
      });
      console.log('scrollTo value got ' + this.val);
      if (this.val != null) {
        //  alert($("#myDiv").offset().top);
       //   this.scrollTo('#formh',null);
         // $( '#main-section').scrollTo();
          //alert($('#myDiv').length);
          //$('#formh').scrollTop(200);
          $('html, body').animate({
              /*scrollTop: $("#myDiv").offset().top+$("#myDiv").offset().top-50*/
              scrollTop: $("#myDiv").offset().top+20
          }, 2000);
      }
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
           // console.log(this.dataForm);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log('result id-----');
                    console.log(result);
                    if (result.status == 'success') {
                        console.log(result.id);
                        this.showlinks = 1;
                        this.addcookie2.putObject('showlinks', 1);
                        this.isModalShown = true;
                        var objcokie = {
                            id: result.id,
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
                        }
                        this.addcookie.putObject('cookiedetails', objcokie);    // Value of result.msg is inserted to userdetails
                        this.cookiedetails = this.addcookie.getObject('cookiedetails');
                        console.log('after putobject ');
                        console.log(this.cookiedetails);
                       // this.setcookie();
                    }
                 //   this.router.navigate(['/']);
                    setTimeout(() => {
                    window.location.reload();
                    }, 3000);
                    /* this.router.navigate(['/home', 'load=1'], {skipLocationChange: true})
                            .then(() => { this.router.navigate(['/home','load=0']); });*/

                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    setcookie() {}
    unsetcookie() {}
   /* setcookie() {
        this.addcookie2.putObject('showlinks', 1);
        console.log('cookie val set '+this.addcookie2.getObject('showlinks'));
        this.showlinks = this.addcookie2.getObject('showlinks');
        setTimeout(() => {
        this.headercomponent.cookiecheck();
        this.footercomponent.cookiecheck();
        }, 300);
    }
    unsetcookie() {
        this.addcookie2.removeAll();
        console.log('cookie val unset '+this.addcookie2.getObject('showlinks'));
        this.showlinks = this.addcookie2.getObject('showlinks');
        setTimeout(() => {
        this.headercomponent.cookiecheck();
        this.footercomponent.cookiecheck();
    }, 300);
    }*/
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
