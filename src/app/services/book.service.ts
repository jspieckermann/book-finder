import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter, FilterType, SearchResult } from '../model/model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly url = 'https://www.googleapis.com/books/v1/volumes?';
  readonly urlIsbn = this.url + 'q=isbn:';
  readonly urlAuthor = this.url + 'q=inauthor:';
  readonly urlTitel = this.url + 'q=intitle:';
  readonly paramStartIndex = 'startIndex';

  private dataSource = new BehaviorSubject<SearchResult>({} as SearchResult);
  private currentResult = this.dataSource.asObservable();
  private currentFilter = new Filter();

  constructor(private http: HttpService) { }

  getCurrentResult(): Observable<SearchResult> {
    return this.currentResult;
  }

  getCurrentFilter(): Filter {
    return this.currentFilter;
  }

  applyFilter(filter: Filter): void {
    let url: string;
    switch (filter.getType()) {
      case FilterType.AUTHOR:
        url = this.urlAuthor  + this.replaceSpaces(filter.getText());
        break;
      case FilterType.TITLE:
        url = this.urlTitel + this.replaceSpaces(filter.getText());
        break;
      default:
        url = this.urlIsbn + this.modifyIsbn(filter.getText());
    }
    this.currentFilter = filter;
    let myMap: Map<string, string> = new Map();
    myMap.set(this.paramStartIndex, filter.getIndex() + '');
    this.filterAndNotifySubscribers(url, myMap);
  }

  private filterAndNotifySubscribers(url: string, param: Map<string, string>): void {
    this.http.doGet(url, param).subscribe((data) => this.dataSource.next(data as SearchResult));
  }

  private modifyIsbn(isbn: string): string {
    return isbn.replace('ISBN', '').replace('isbn', '').replace('-', '').trim();
  }

  private replaceSpaces(text: string): string {
    return text.trimStart().trimEnd().replace(' ', '+');
  }

}
