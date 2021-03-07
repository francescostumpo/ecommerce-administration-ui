import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private httpClient: HttpClient) { }

  downloadReport(dataDa: Date, dataA: Date, tagId: string): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      .get<any>(environment.aragonBackendUrl + '/api/rc/downloadReport?tagId=' + tagId + '&startDate=' + dataDa + '&endDate=' + dataA, { headers, observe: 'body', responseType: 'arraybuffer' });
  }
}
