import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../model/model';
import { FormBuilder } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  result: SearchResult = {} as SearchResult;
  
  filterForm = this.formBuilder.group({
    type: '',
    content: ''
  });

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
    this.bookService.currentResult.subscribe((data: SearchResult) => this.result = data);
  }
    
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.filterForm.value);
    this.bookService.applyIsbnFilter(this.filterForm.value.content);
    this.filterForm.reset();
  }

}
