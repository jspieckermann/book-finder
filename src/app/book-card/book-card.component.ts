import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../model/model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  expanded = false;
  defaultText = '-'; 
  defaultThumbnail = '/assets/no-image-icon.png';


  @Input() item: Item = {} as Item;
  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  getAuthors(): string {
    let authors = this.item.volumeInfo.authors;
    let result = this.defaultText;
    if (authors && authors.length > 0) {
      result = authors[0];
      for (let i = 1; i < authors.length; i++) {
        result += ', ' + authors[i];
      }
    }
    return result;
  }

  getThumbnail(): string {
    return this.item.volumeInfo.imageLinks ? 
      this.transformString(this.item.volumeInfo.imageLinks.thumbnail, this.defaultThumbnail) :
        this.defaultThumbnail;
  }

  getDescription(): string {
    return this.transformString(this.item.volumeInfo.description, this.defaultText);
  }

  getTitle(): string {
    return this.transformString(this.item.volumeInfo.title, this.defaultText);
  }

  getPublishedDate(): string {
    return this.transformString(this.item.volumeInfo.publishedDate, this.defaultText);
  }

  getPageCount(): string {
    return this.transformString(this.item.volumeInfo.pageCount, this.defaultText);
  }

  private transformString(value: string, defaultValue: string): string {
    return value ? value : defaultValue; 
  }

  getIsbn(): string {
    let industryIdentifiers = this.item.volumeInfo.industryIdentifiers;
    return industryIdentifiers && industryIdentifiers.length > 0 ? 
      industryIdentifiers[0].identifier : this.defaultText;
  }

}
