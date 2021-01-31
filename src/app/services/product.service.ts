import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllProducts(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/pc/getAllProducts', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  deleteTagFromProduct(request: { productId: string; tagId: string }): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // @ts-ignore
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/pc/removeTagFromProduct', request, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  addTagToProduct(request: { productId: string; tagId: string }): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // @ts-ignore
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/pc/addTagToProduct', request, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:typedef
  updateSubCategoryFromProduct(request: { productId: string; subCategoryId: string }) {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // @ts-ignore
    return this.httpClient
      .put<any>(environment.aragonBackendUrl + '/api/pc/updateProductCategory', request, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateProduct(product: Product): Observable<HttpResponse<Object>> {
  const headers = new HttpHeaders({Authorization: 'Bearer ey'});
  return this.httpClient
.post<any>(environment.aragonBackendUrl + '/api/pc/createProduct', product, {headers, observe: 'response'});
  }
}
