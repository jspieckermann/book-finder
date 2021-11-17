import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { SearchResult } from './model/model';
import { BookService } from './services/book.service';

describe('AppComponent', () => {
  let observable = new BehaviorSubject<SearchResult>({} as SearchResult);
  let mockedBookService = jasmine.createSpyObj('BookService', ['applyFilter', 'getCurrentResult', 'getCurrentFilter']);
  mockedBookService.getCurrentResult.and.returnValue(observable);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, ReactiveFormsModule
      ],
      declarations: [
        AppComponent, BookSearchComponent, BookListComponent
      ],
      providers: [{
        provide: BookService,
        useValue: mockedBookService
      }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title')?.textContent).toContain('Book-Finder');
  });
});
