import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Filter, FilterType, Item, SearchResult, VolumeInfo } from '../model/model';
import { BookService } from './book.service';
import { HttpService } from './http.service';


describe('BookService', () => {
  let service: BookService;
  let searchResult = createSearchResult(10, 10);
  let observable = new BehaviorSubject<SearchResult>(searchResult as SearchResult);
  const mockedHttpService = jasmine.createSpyObj('HttpService', ['doGet']);
  mockedHttpService.doGet.and.returnValue(observable);

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: HttpService, useValue: mockedHttpService }
      ]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct filter', () => {
    let filter = new Filter(FilterType.ISBN, '', 0);
    service.applyFilter(filter);
    expect(service.getCurrentFilter()).toBe(filter);
  });


  it('should have the correct result', () => {
    let filter = new Filter(FilterType.ISBN, '', 0);
    let result: SearchResult = {} as SearchResult;
    service.getCurrentResult().subscribe((data: SearchResult) => {
      result = data;
    });
    service.applyFilter(filter);
    expect(result).toBe(searchResult);
  });

  it('should have the correct start index', () => {
    let filter = new Filter(FilterType.AUTHOR, 'Ken Follet', 0);
    let myMap: Map<string, string> = new Map();
    myMap.set('startIndex', '0');
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(jasmine.anything(), myMap);
    filter = new Filter(FilterType.AUTHOR, 'Ken Follet', 10);
    myMap.set('startIndex', '10');
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(jasmine.anything(), myMap);
  });

  it('should have the correct url for AUTHOR search', () => {
    let filter = new Filter(FilterType.AUTHOR, 'Ken Follet', 0);
    let expected = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:Ken+Follet';
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());

    filter = new Filter(FilterType.AUTHOR, '   Ken    Follet   ', 0);
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());
  });

  it('should have the correct url for TITLE search', () => {
    let filter = new Filter(FilterType.TITLE, 'Die Nadel', 0);
    let expected = 'https://www.googleapis.com/books/v1/volumes?q=intitle:Die+Nadel';
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());

    filter = new Filter(FilterType.TITLE, '   Die    Nadel   ', 0);
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());
  });

  it('should have the correct url for TITLE search', () => {
    let filter = new Filter(FilterType.ISBN, '9783838700601', 0);
    let expected = 'https://www.googleapis.com/books/v1/volumes?q=isbn:9783838700601';
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());

    filter = new Filter(FilterType.ISBN, '978-3838700601', 0);
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());

    filter = new Filter(FilterType.ISBN, 'ISBN978-3838700601', 0);
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());

    filter = new Filter(FilterType.ISBN, 'isbn 978-3838700601', 0);
    service.applyFilter(filter);
    expect(mockedHttpService.doGet).toHaveBeenCalledWith(expected, jasmine.anything());
  });


});
