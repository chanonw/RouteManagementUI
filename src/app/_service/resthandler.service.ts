import {
  Http,
  Headers,
  RequestOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { server_url } from './../_config/const';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestHandlerService {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private router: Router) {}

  postData(data: any, path: string): Observable<any> {
    const body = new URLSearchParams();
    body.append('data', JSON.stringify(data));
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers });
    const url = server_url + path;
    console.log('[POST] DATA : ' + JSON.stringify(data));
    return this.http.post(url, data, options).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getData(path: string): Observable<any> {
    const url = server_url + path;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  // private handleError(error: any) {
  //   const applicationError = error.headers.get('Application-Error');
  //   if (applicationError) {
  //     return Observable.throw(applicationError);
  //   }
  //   const serverError = error.json();
  //   let modelStateError = '';
  //   if (serverError) {
  //     for (const key in serverError) {
  //       if (serverError[key]) {
  //         modelStateError += serverError[key] + '\n';
  //       }
  //     }
  //   }
  //   return Observable.throw(modelStateError || 'Server error');
  // }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    // return Observable.throw(errMsg);
    return throwError(errMsg);
  }
}
