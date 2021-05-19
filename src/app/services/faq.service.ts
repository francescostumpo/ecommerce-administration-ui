import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Faq} from '../models/faq';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private httpClient: HttpClient) { }

  getAllFaqs(): Observable<HttpResponse<Faq[]>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient.get<Faq[]>(environment.aragonBackendUrl + '/api/fc/getAllFaqs', {headers, observe: 'response'});
  }

  getFaqById(id: string): Observable<HttpResponse<Faq>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient.get<Faq>(environment.aragonBackendUrl + '/api/fc/getFaqById/' + id, {headers, observe: 'response'});

  }
  // tslint:disable-next-line:ban-types
  createOrUpdateFaq(faq: Faq): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/fc/createOrUpdateFaq', faq, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  deleteFaq(faq: Faq): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient.delete<any>(environment.aragonBackendUrl + '/api/fc/deleteFaq/' + faq._id + '/' + faq._rev, {headers, observe: 'response'});
  }
}
