import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../model/model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  
  result: SearchResult = {} as SearchResult;

  constructor(private bookService: BookService) {
    this.bookService.currentResult.subscribe((data: SearchResult) => this.result = data);
  }

  ngOnInit(): void {
  }

}
