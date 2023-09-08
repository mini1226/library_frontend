import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(page:any, limit:any): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(environment.baseUrl + 'books/paginated',{params});
  }

  getBooksById(id:any): Observable<any> {
    return this.http.get(environment.baseUrl + 'books/'+id);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'books',book);
  }

  updateBook(id: number, bookData: any) {
    return this.http.put(environment.baseUrl + 'books/'+id, bookData);
  }
}
