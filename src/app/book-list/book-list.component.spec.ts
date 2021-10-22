import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';

import { BookListComponent } from './book-list.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => MockBuilder(BookListComponent)
  .mock(BookService, {
    // adding custom behavior to the service
    applyFilter: jasmine.createSpy().and.returnValue('king'),
  })
);

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not display the paginator initially', () => {
    expect(component.showPaginator()).toBeFalse();
  });
});
