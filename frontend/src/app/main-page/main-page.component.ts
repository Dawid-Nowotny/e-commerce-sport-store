import { Component, OnInit } from '@angular/core';
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
  constructor(private titleService: Title, private serverService: ServerService, private router: Router) {
  }

  ngOnInit() {
    this.fetchProducts();
    this.titleService.setTitle('AWAZONsport');
  }
  items: Item[] = [];
  pageSizeOptions: number[] = [15, 25, 50];
  currentPageIndex = 0;
  pageSize = 15;
  totalItems = 0;

  fetchProducts(): void {
    this.serverService.getProducts(this.currentPageIndex, this.pageSize).subscribe(response => {
      this.items = response.items;
      console.log(this.items[0].id);
      this.totalItems = response.totalItems;
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