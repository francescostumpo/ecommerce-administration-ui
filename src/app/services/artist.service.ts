import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Tag} from '../models/tag';
import {Artist} from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllArtists(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.aragonBackendUrl + '/api/ar/getAllArtists', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateArtist(artist: Artist): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/ar/createOrUpdateArtist', artist, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  removeTagFromArtist(request: { artistId: string }): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // @ts-ignore
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/ar/removeTagFromArtist', request, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  addTagToArtist(request: { artistId: string; tagId: string }): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    // @ts-ignore
    return this.httpClient
      .post<any>(environment.aragonBackendUrl + '/api/ar/addTagToArtist', request, {headers, observe: 'response'});
  }
}
