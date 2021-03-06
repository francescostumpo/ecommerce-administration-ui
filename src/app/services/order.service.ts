import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Artist} from '../models/artist';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllOrders(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/oc/getAllOrders', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  getOrderByStatus(status: string): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // tslint:disable-next-line:no-debugger
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/oc/getOrdersByStatus/' + status, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  getOrder(id: string): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // tslint:disable-next-line:no-debugger
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/oc/getOrder/' + id, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  updateOrder(order: Order, comingFrom: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/oc/createOrder/' + comingFrom, order, {headers, observe: 'response'});
  }
}
