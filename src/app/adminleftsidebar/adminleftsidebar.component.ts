import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-adminleftsidebar',
  templateUrl: './adminleftsidebar.component.html',
  styleUrls: ['./adminleftsidebar.component.css']
})
export class AdminleftsidebarComponent implements OnInit {
    private addcookie: CookieService;
    private cookiedetails;
    public name;

    constructor(addcookie: CookieService, private _http: Http, private router: Router) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        if (typeof(this.cookiedetails) == 'undefined') {
            console.log(this.cookiedetails + '??????????');
            console.log('admin_leftsidebar');
            this.router.navigateByUrl('/');
        }
        else {
            this.name = this.cookiedetails.first_name + ' ' + this.cookiedetails.last_name;
        }
    }

    ngOnInit() {
    }
    logout() {
        this.addcookie.removeAll();
        this.router.navigateByUrl('/');

    }
}