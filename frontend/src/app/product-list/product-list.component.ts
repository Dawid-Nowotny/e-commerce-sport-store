import { Component, OnInit } from '@angular/core';
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
  constructor(private titleService: Title, private serverService: ServerService, private router: Router) {}

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
      this.totalItems = response.totalItems;
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
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(currentUrl);
      });
    });
  }
}
