import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // array to store data for edit page
  editDetails = {};

  // concatenated query string for API
  finalSearchCriteria: string;

  constructor(private http: HttpClient) { }

  getBooks(criteria): Observable<any> {
    this.finalSearchCriteria = `?name=${criteria.name}&title=${criteria.title}`;
    console.log(this.finalSearchCriteria);
    return this.http.get(`${environment.api_url}${this.finalSearchCriteria}`);
  }

  getBook(criteria): Observable<any> {
    return this.http.get(`${environment.api_url}/${criteria}`);
  }

  editBook(details): Observable<any> {
    return this.http.put(`${environment.api_url}/edit`, details);
  }

  uploadImage(details): Observable<any> {
    return this.http.post(`${environment.api_url}/upload`, details);
  }

  uploadImageID(details): Observable<any> {
    return this.http.post(`${environment.api_url}/uploadid`, details);
  }

  addBook(details): Observable<any> {
    return this.http.post(`${environment.api_url}/add`, details);
  }

  deleteBook(details): Observable<any> {
    return this.http.post(`${environment.api_url}/delete`, details);
  }

}
