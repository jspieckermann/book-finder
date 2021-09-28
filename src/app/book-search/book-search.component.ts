import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../model/model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  result: SearchResult = {} as SearchResult;

  constructor(private searchService: SearchService) {
    this.searchService.getBookByIsbn('1234').subscribe((data: SearchResult) => this.result = data);
  }
    
  ngOnInit(): void {
  }

}
