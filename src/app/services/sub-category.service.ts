import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';
import {SubCategory} from '../models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllSubCategories(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/scc/getAllSubCategories', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  getSubCategory(subCategoryId: string): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // tslint:disable-next-line:no-debugger
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/scc/getSubCategory/' + subCategoryId, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateSubCategory(subCategory: SubCategory): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/scc/createSubCategory', subCategory, {headers, observe: 'response'});
  }
}
