import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
/*    private addcookie2: CookieService;
    private showlinks;*/
    private cookiedetails;
    private addcookie: CookieService;

    constructor( addcookie: CookieService, private router: Router) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
    }
    ngOnInit() {
    }
    logout() {
        this.addcookie.removeAll();
        window.location.reload();
        this.router.navigateByUrl('/');

    }
  /*  cookiecheck() {
        console.log('call to footer');
        this.showlinks = this.addcookie2.getObject('showlinks');
        console.log('footer '+this.showlinks);
    }*/
}
