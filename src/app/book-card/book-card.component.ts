import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../model/model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() item: Item = {} as Item;
  constructor() { }

  ngOnInit(): void {
  }

}
