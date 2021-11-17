import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { ImageLinks, Item } from '../model/model';
import { VolumeInfo } from '../model/model';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let item: Item;
  let volumnInfo: VolumeInfo;
  let imageLinks: ImageLinks;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    item = {} as Item;
    volumnInfo = {} as VolumeInfo;
    imageLinks = {} as ImageLinks;
    item.volumeInfo = volumnInfo;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return default thumbnail when image links not available', () => {
    expect(component.getThumbnail()).toEqual('/assets/no-image-icon.png');
  });

  it('should return default when thumbnail not available', () => {
    component.item.volumeInfo.imageLinks = imageLinks;
    expect(component.getThumbnail()).toEqual('/assets/no-image-icon.png');
  });

  it('should return the thumbnail when available', () => {
    component.item.volumeInfo.imageLinks = imageLinks;
    component.item.volumeInfo.imageLinks.thumbnail = 'my-test.png';
    expect(component.getThumbnail()).toEqual('my-test.png');
  });

  it('should return default when description not set', () => {
    expect(component.getDescription()).toEqual('-');
  });

  it('should return description when description is set', () => {
    component.item.volumeInfo.description = 'text';
    expect(component.getDescription()).toEqual('text');
  });

  it('should return default when page count not set', () => {
    expect(component.getPageCount()).toEqual('-');
  });

  it('should return page count when page count is set', () => {
    component.item.volumeInfo.pageCount = '25';
    expect(component.getPageCount()).toEqual('25');
  });

  it('should return default when author not set', () => {
    expect(component.getAuthors()).toEqual('-');
  });

  it('should return default when author array empty', () => {
    component.item.volumeInfo.authors = [];
    expect(component.getAuthors()).toEqual('-');
  });

  it('should return authors when authors is set', () => {
    component.item.volumeInfo.authors = ['Ken Follet', 'Peter Lustig'];
    expect(component.getAuthors()).toEqual('Ken Follet, Peter Lustig');
  });

  it('should return default when industry identifier not set', () => {
    expect(component.getIsbn()).toEqual('-');
  });

  it('should return default when industry identifier empty', () => {
    component.item.volumeInfo.industryIdentifiers = [];
    expect(component.getIsbn()).toEqual('-');
  });

  it('should return the correct expanded state on toggle', () => {
    expect(component.expanded).toBeFalse();
    component.toggleExpand();
    expect(component.expanded).toBeTrue();
    component.toggleExpand();
    expect(component.expanded).toBeFalse();
  });

});
