import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { ServerService } from '../server.service';
import { Item } from '../item/item';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  items: Item[] = [];
  pageSizeOptions: number[] = [15, 25, 50];
  currentPageIndex = 0;
  pageSize = 15;
  totalItems = 0;
  filter: string = '';
  priceOrder: string = '';
  categories: any = '';
  category_id: string = '';
  brands: any = '';
  brand_id: string = '';
  
  constructor(private titleService: Title, private serverService: ServerService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.fetchProducts();
    this.titleService.setTitle('AWAZONsport');
    this.serverService.getBrandsAndCategories().subscribe(response => {
      this.categories = [{id: '', name: 'Wszystkie'}].concat(response.categories);
      this.brands = [{id: '', name: 'Wszystkie'}].concat(response.brands);
    });
  }

  fetchProducts(): void {
    if (this.filter === "") {
      this.serverService.getProducts(this.currentPageIndex, this.pageSize).subscribe(response => {
        this.items = response.items;
        this.totalItems = response.totalItems;
      });
    } else {
      this.serverService.getFilteredProducts(this.currentPageIndex, this.pageSize, this.filter).subscribe(response => {
        this.items = response.items;
        this.totalItems = response.totalItems;
      });
    }
  }

  setFilters(): void {
    if (this.priceOrder != '')
      this.filter = '&priceOrder=' + this.priceOrder;
    if (this.brand_id != '')
      this.filter += '&brand=' + this.brand_id;
    if (this.category_id != '')
      this.filter += '&category=' + this.category_id;
    this.getFilteredList();
  }

  setPriceOrder(priceOrder: string): void {
    this.priceOrder = priceOrder;
    this.getFilteredList();
    this.setFilters();
  }

  getFilteredList(): void {
    this.serverService.getFilteredProducts(this.currentPageIndex, this.pageSize, this.filter).subscribe(response => {
      console.log(response);
      this.items = response.items;
      this.totalItems = response.totalItems;
      this.cdr.detectChanges();
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchProducts();
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }
}