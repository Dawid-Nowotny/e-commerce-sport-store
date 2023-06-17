import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ServerService } from '../server.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let titleService: Title;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, NavBarComponent],
      imports: [FormsModule, RouterTestingModule, BrowserAnimationsModule, MatPaginatorModule, HttpClientTestingModule],
      providers: [Title, ServerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    serverService = TestBed.inject(ServerService);

    spyOn(titleService, 'setTitle');
    spyOn(serverService, 'getProducts').and.returnValue(of({ items: [], totalItems: 0 }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    expect(serverService.getProducts).toHaveBeenCalled();
    expect(component.items).toEqual([]);
    expect(component.totalItems).toBe(0);
  });

  it('should update current page index and page size on page change', () => {
    const event: PageEvent = { pageIndex: 2, pageSize: 25, length: 100 };

    component.onPageChange(event);

    expect(component.currentPageIndex).toBe(2);
    expect(component.pageSize).toBe(25);
    expect(serverService.getProducts).toHaveBeenCalled();
  });
});
