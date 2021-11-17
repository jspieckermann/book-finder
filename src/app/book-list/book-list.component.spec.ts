import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Filter, FilterType, Item, SearchResult, VolumeInfo } from '../model/model';
import { BookService } from '../services/book.service';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let observable = new BehaviorSubject<SearchResult>({} as SearchResult);
  let filter = new Filter(FilterType.ISBN, '', 0);

  const mockedBookService = jasmine.createSpyObj('BookService', ['applyFilter', 'getCurrentResult', 'getCurrentFilter']);
  mockedBookService.getCurrentResult.and.returnValue(observable);
  mockedBookService.getCurrentFilter.and.returnValue(filter);


  function createSearchResult(totalItems: number, items: number): SearchResult {
    let result: SearchResult = {} as SearchResult;
    result.totalItems = totalItems;
    result.items = [];
    for (let index = 0; index < items; index++) {
      let item = {} as Item;
      let volumnInfo = {} as VolumeInfo;
      item.volumeInfo = volumnInfo;
      result.items[result.items.length] = item;
    }
    return result;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListComponent ],
      providers: [{
        provide: BookService,
        useValue: mockedBookService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    observable.next(createSearchResult(10, 10));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct search results from service', () => {
    observable.next(createSearchResult(5, 5));
    expect(component.result.totalItems).toEqual(5);
    expect(component.result.items.length).toEqual(5);
    observable.next(createSearchResult(255, 10));
    expect(component.result.totalItems).toEqual(255);
    expect(component.result.items.length).toEqual(10);
  });

  it('should not display the paginator initially', () => {
    expect(component.showPaginator()).toBeFalse();
  });

  it('should not display the paginator when all books can be displayed', () => {
    observable.next(createSearchResult(10, 10));
    expect(component.showPaginator()).toBeFalse();
  });

  it('should display the paginator when not all books be displayed', () => {
    observable.next(createSearchResult(255, 10));
    expect(component.showPaginator()).toBeTrue();
  });

  it('should apply the correct filter on page changed', () => {
    observable.next(createSearchResult(255, 10));
    expect(component.page).toBe(1);
    component.page = 2;
    component.onPageChanged();
    let filter = new Filter(FilterType.ISBN, '', 10);
    expect(mockedBookService.applyFilter).toHaveBeenCalled();
    expect(mockedBookService.applyFilter).toHaveBeenCalledWith(filter);
    component.page = 1;
    component.onPageChanged();
    filter = new Filter(FilterType.ISBN, '', 0);
    expect(mockedBookService.applyFilter).toHaveBeenCalledWith(filter);
  });

});
