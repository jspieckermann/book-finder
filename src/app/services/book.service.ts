import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private dataSource = new BehaviorSubject<SearchResult>({} as SearchResult);
  
  currentResult = this.dataSource.asObservable();

  constructor(private http: HttpService) { }

  applyFilter(filterType: FilterType, text: string): void {
    switch (filterType) {
      case FilterType.AUTHOR:
        this.filterAndNotifySubscribers(this.urlAuthor  + this.replaceSpaces(text));
        break;
      case FilterType.TITLE:
        this.filterAndNotifySubscribers(this.urlTitel + this.replaceSpaces(text));
        break;
      default:
        this.filterAndNotifySubscribers(this.urlIsbn + this.modifyIsbn(text));
    }
  }

  private filterAndNotifySubscribers(url: string) {
    this.http.doGet(url).subscribe((data) => this.dataSource.next(data as SearchResult));
  }

  private modifyIsbn(isbn: string): string {
    return isbn.replace('ISBN', '').replace('isbn', '').replace('-', '').trim();
  }

  private replaceSpaces(text: string): string {
    return text.trimStart().trimEnd().replace(' ', '+');
  }

}
