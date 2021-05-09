import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Tag} from '../models/tag';
import {DiscountCode} from '../models/discount-code';

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllDiscountCodes(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/disc/getAllDiscountCodes', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateDiscountCode(discountCode: DiscountCode): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/disc/createOrUpdateDiscountCode', discountCode, {headers, observe: 'response'});
  }
}
