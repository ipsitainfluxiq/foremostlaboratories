import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   // private addcookie2: CookieService;
  //  private showlinks;
    private cookiedetails;
    private addcookie: CookieService;

  constructor( addcookie: CookieService, private router: Router) {
     // this.showlinks = 0;
      this.addcookie = addcookie;
      this.cookiedetails = this.addcookie.getObject('cookiedetails');
      console.log('this.cookiedetails');
      console.log(this.cookiedetails);
   //   this.addcookie2 = addcookie2;
   //   this.showlinks = this.addcookie2.getObject('showlinks');
    //  console.log(this.showlinks);
  }

  ngOnInit() {
  }

/*cookiecheck() {
      console.log('call to header');
    this.showlinks = this.addcookie2.getObject('showlinks');
    console.log('header '+this.showlinks);
}*/
}
