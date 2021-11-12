import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterType } from '../model/model';
import { BookService } from '../services/book.service';

import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  const mockedBookService = jasmine.createSpyObj('BookService', ['applyFilter']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BookSearchComponent ],
      providers: [{
        provide: BookService,
        useValue: mockedBookService
      }, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call apply filter with ISBN (default)', () => {
    component.onSubmit();
    expect(mockedBookService.applyFilter).toHaveBeenCalled();
    expect(mockedBookService.applyFilter).toHaveBeenCalledWith(component.filterType.ISBN, '', 0);
  });

  it('should call apply filter with AUTHOR and Ken Follet', () => {
    component.filterForm.setValue({
      type: FilterType.AUTHOR, 
      content: 'Ken Follet'
    });
    component.onSubmit();
    expect(mockedBookService.applyFilter).toHaveBeenCalled();
    expect(mockedBookService.applyFilter).toHaveBeenCalledWith(FilterType.AUTHOR, 'Ken Follet', 0);
  });

});
