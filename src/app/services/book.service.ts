import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../model/model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly urlBooksApi = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  private dataSource = new BehaviorSubject<SearchResult>({} as SearchResult);
  
  currentResult = this.dataSource.asObservable();

  constructor(private http: HttpService) { }

   applyIsbnFilter(isbn: string): void {
    this.http.doGet(this.urlBooksApi + isbn).subscribe((data) => this.dataSource.next(data as SearchResult));
  }

}
