import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllCategories(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/cc/getAllCategories', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateCategory(category: Category): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/cc/createCategory', category, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  addSubCategoryToCategory(request: { subCategoryId: string; categoryId: string }): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/cc/addSubCategoryToCategory', request, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  deleteSubCategoryFromCategory(request: { subCategoryId: string; categoryId: string }): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // @ts-ignore
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/cc/deleteSubCategoryFromCategory', request, {headers, observe: 'response'});
  }
}
