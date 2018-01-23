import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
    url: any;

    constructor(private http: Http) {
        if (window.location.hostname == 'localhost') {
            this.url = 'http://localhost:3010/';
        } else {
            this.url = 'http://influxiq.com:3019/';
        }

    }



}