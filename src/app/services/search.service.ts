import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../model/model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly urlBooksApi = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

  constructor(private http: HttpService) { }

  getBookByIsbn(isbn: string): Observable<SearchResult> {
    return this.http.doGet(this.urlBooksApi + '0735619621');
  }
}
