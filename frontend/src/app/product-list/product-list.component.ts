import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../item/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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

  constructor(private titleService: Title, private serverService: ServerService, private router: Router, private cdr: ChangeDetectorRef) {}

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
    this.filter = '';
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

  goToEditProduct(productId: string): void {
    this.router.navigate(['/admin-panel/edit-product', productId]);
  }

  goToIncreaseStock(productId: string): void {
    this.router.navigate(['/admin-panel/increase-stock', productId]);
  }

  deleteProduct(productId: string): void {
    this.serverService.deleteProduct(productId).subscribe(response => {
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
    });
  }
}
