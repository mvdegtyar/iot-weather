import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http) {

        this.actionUrl = '/api/weather/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<any> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <any>response.json());
    }
  }