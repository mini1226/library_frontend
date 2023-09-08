import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.http.get(environment.baseUrl + 'authors');
  }

  getAuthorsById(id:any): Observable<any> {
    return this.http.get(environment.baseUrl + 'authors/'+id);
  }

  addAuthor(author: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'authors',author);
  }

  updateAuthor(id: number, authorData: any) {
    return this.http.put(environment.baseUrl + 'authors/'+id, authorData);
  }

}
