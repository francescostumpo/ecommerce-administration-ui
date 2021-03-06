import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {SubCategory} from '../models/sub-category';
import {Stock} from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getStockBySubCategoryId(subCategoryId: string): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // tslint:disable-next-line:no-debugger
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/stc/getStockBySubCategoryId/' + subCategoryId, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateStock(stock: Stock): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/stc/createStock', stock, {headers, observe: 'response'});
  }
}
