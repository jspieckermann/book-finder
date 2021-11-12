import { Component, OnInit } from '@angular/core';
import { FilterType } from '../model/model';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  filterType = FilterType;
  enableSearch = false;
  
  filterForm = this.formBuilder.group({
    type: FilterType.ISBN,
    content: ['', [Validators.required]]
  });

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {

  }
    
  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.bookService.applyFilter(this.filterForm.value.type,
        this.filterForm.value.content, 0);
  }

}
