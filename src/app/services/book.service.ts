import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterType, SearchResult } from '../model/model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly url = 'https://www.googleapis.com/books/v1/volumes?';
  private readonly urlIsbn = this.url + 'q=isbn:';
  private readonly urlAuthor = this.url + 'q=inauthor:';
  private readonly urlTitel = this.url + 'q=intitle:';
  private readonly paramStartIndex = 'startIndex';

  private dataSource = new BehaviorSubject<SearchResult>({} as SearchResult);
  
  currentResult = this.dataSource.asObservable();
  currentFilterType: FilterType = {} as FilterType;
  currentFilterText = '';
  currentStartIndex = 0;

  constructor(private http: HttpService) { }

  applyFilter(filterType: FilterType, text: string, startIndex: number): void {
    let url: string;
    switch (filterType) {
      case FilterType.AUTHOR:
        url = this.urlAuthor  + this.replaceSpaces(text);
        break;
      case FilterType.TITLE:
        url = this.urlTitel + this.replaceSpaces(text);
        break;
      default:
        url = this.urlIsbn + this.modifyIsbn(text);
    }
    this.currentFilterText = text;
    this.currentFilterType = filterType;
    this.currentStartIndex = startIndex;
    let myMap: Map<string, string> = new Map();
    myMap.set(this.paramStartIndex, startIndex + '');
    this.filterAndNotifySubscribers(url, myMap);
  }

  private filterAndNotifySubscribers(url: string, param: Map<string, string>) {
    this.http.doGet(url, param).subscribe((data) => this.dataSource.next(data as SearchResult));
  }

  private modifyIsbn(isbn: string): string {
    return isbn.replace('ISBN', '').replace('isbn', '').replace('-', '').trim();
  }

  private replaceSpaces(text: string): string {
    return text.trimStart().trimEnd().replace(' ', '+');
  }

}
