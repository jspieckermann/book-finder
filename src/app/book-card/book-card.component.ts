import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../model/model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  expanded = false;

  @Input() item: Item = {} as Item;
  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(): void {
    this.expanded = ! this.expanded;
  }

  getAuthors(): string {
    let authors = this.item.volumeInfo.authors;
    let result = '-';
    if (authors) {
      if (authors.length > 0) {
        result = authors[0];
      }
      for (let i = 1; i < authors.length; i++) {
        result += ', ' + authors[i];
      }
    }
    return result;
  }

  hasThumbnail(): boolean {
    let result = false;
    if(this.item.volumeInfo.imageLinks && this.item.volumeInfo.imageLinks.thumbnail) {
      result = true;
    }
    return result;
  }

  getThumbnail(): string {
    let result = '/assets/no-image-icon.png';
    if(this.item.volumeInfo.imageLinks && this.item.volumeInfo.imageLinks.thumbnail) {
      result = this.item.volumeInfo.imageLinks.thumbnail;
    }
    return result;
  }

  getDescription(): string {
    let result = '-';
    if(this.item.volumeInfo.description) {
      result = this.item.volumeInfo.description;
    }
    return result;
  }

  getTitle(): string {
    let result = '-';
    if(this.item.volumeInfo.title) {
      result = this.item.volumeInfo.title;
    }
    return result;
  }

  getPublishedDate(): string {
    let result = '-';
    if(this.item.volumeInfo.publishedDate) {
      result = this.item.volumeInfo.publishedDate;
    }
    return result;
  }

  getPageCount(): string {
    let result = '-';
    if(this.item.volumeInfo.pageCount) {
      result = this.item.volumeInfo.pageCount + '';
    }
    return result;
  }

  getIsbn(): string {
    let isbn = this.item.volumeInfo.industryIdentifiers;
    let result = '-';
    if (isbn) {
      if (isbn.length > 0) {
        result = isbn[0].identifier;
      }
    }
    return result;
  }


}
