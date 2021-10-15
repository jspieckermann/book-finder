import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResult } from '../model/model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  
  subscription: Subscription = {} as Subscription; 
  result: SearchResult = {} as SearchResult;
  page: number = 1;

  constructor(private bookService: BookService) {
    this.subscription = this.bookService.currentResult.subscribe((data: SearchResult) => {
      this.result = data;
      if (this.page > 1 && this.bookService.currentStartIndex == 0) {
        this.page = 1;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showPaginator(): boolean {
    return this.result.totalItems > this.result.items.length;
  }

  onPageChanged(): void {
    let index = (this.page - 1) * this.result.items.length;
    this.bookService.applyFilter(this.bookService.currentFilterType, this.bookService.currentFilterText, index);
  }

}
