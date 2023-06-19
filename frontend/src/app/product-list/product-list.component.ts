import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServerService } from '../server.service';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../item/item';
import { Router } from '@angular/router';
import { Sizes } from '../sizes/sizes';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  isLoading: boolean = false;
  isLogged: boolean = false;
  admin: boolean = false;
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
  sizes: string[] = [];
  size: string = 'Wszystkie';
  message: string = '';
  minPrice: string = '';
  maxPrice: string = '';
  messagePrice: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private serverService: ServerService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if(this.serverService.admin == true) {
      this.fetchProducts();
        this.serverService.getBrandsAndCategories().subscribe(response => {
          this.categories = [{id: '', name: 'Wszystkie'}].concat(response.categories);
          this.brands = [{id: '', name: 'Wszystkie'}].concat(response.brands);
        });
    }
  }

  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
    this.admin = this.serverService.admin;
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const isDigit = /[0-9]/.test(event.key);
    
    if (!isDigit && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  fetchProducts(): void {
    if (this.filter === "") {
      this.isLoading = true;
      this.serverService.getProducts(this.currentPageIndex, this.pageSize).subscribe(response => {
        this.items = response.items;
        this.totalItems = response.totalItems;
        this.isLoading = false;
      });
    } else {
      this.isLoading = true;
      this.serverService.getFilteredProducts(this.currentPageIndex, this.pageSize, this.filter).subscribe(response => {
        this.items = response.items;
        this.totalItems = response.totalItems;
        this.isLoading = false;
      });
    }
  }

  setFilters(): void {
    this.currentPageIndex = 0;
    this.filter = '';
    if (this.priceOrder != '')
      this.filter = '&priceOrder=' + this.priceOrder;
    if (this.brand_id != '')
      this.filter += '&brand=' + this.brand_id;
    if (this.category_id != '')
      this.filter += '&category=' + this.category_id;
    if (this.size != 'Wszystkie')
      this.filter += '&size=' + this.size;
    if (parseInt(this.minPrice) > parseInt(this.maxPrice) && this.minPrice != '' && this.maxPrice != '')  {
      this.messagePrice = "Maksymalna cena musi być większa od minimalnej!";
    } else {
      if (this.minPrice != '')
        this.filter += '&minPrice=' + this.minPrice;
      if (this.maxPrice != '')
        this.filter += '&maxPrice=' + this.maxPrice;
        this.messagePrice = '';
    }
    
    if (this.brand_id != '' && this.category_id == '') {
      this.router.navigate([''], { queryParams: { brand: this.getBrandName(this.brand_id), category: 'Wszystkie' }, queryParamsHandling: 'merge' });
    } else if (this.brand_id == '' && this.category_id != '') {
      this.router.navigate([''], { queryParams: { brand: 'Wszystkie', category: this.getCategoryName(this.category_id) }, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([''], { queryParams: { brand: this.getBrandName(this.brand_id), category: this.getCategoryName(this.category_id) }, queryParamsHandling: 'merge' });
    }

    this.getFilteredList();
  }

  getFilteredList(): void {
    this.isLoading = true;
    this.serverService.getFilteredProducts(this.currentPageIndex, this.pageSize, this.filter).subscribe(response => {
      this.items = response.items;
      this.totalItems = response.totalItems;
      this.cdr.detectChanges();
      if(response.items == '')
        this.message = "Brak produktu spełniającego twoje wymagania!";
      else
        this.message = "";
        this.isLoading = false;
    });
    if(this.category_id == "-NXG8RXJvHD7XbWsLnT6")
      this.sizes = ['Wszystkie'].concat(Sizes.boots);
    else if(this.category_id == "-NXa-Qvz967o-qB0lcic")
      this.sizes = ['Wszystkie'].concat(Sizes.clothes);
    else if(this.category_id == "-NXa-TJD7wTZPPRVrPwv")
      this.sizes = ['Wszystkie'].concat(Sizes.balls);
  }

  setPriceOrder(priceOrder: string): void {
    this.priceOrder = priceOrder;
    this.getFilteredList();
    this.setFilters();
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
      console.log(response);
      if(response.success == true) {
        this.successMessage = response.message;
        this.errorMessage = '';
      } else {
        this.successMessage = '';
        this.errorMessage = response.message;
      }
      if (this.filter === "") {
        this.isLoading = true;
        this.serverService.getProducts(this.currentPageIndex, this.pageSize).subscribe(response => {
          this.items = response.items;
          this.totalItems = response.totalItems;
          this.isLoading = false;
        });
      } else {
        this.isLoading = true;
        this.serverService.getFilteredProducts(this.currentPageIndex, this.pageSize, this.filter).subscribe(response => {
          this.items = response.items;
          this.totalItems = response.totalItems;
          this.isLoading = false;
        });
      }
    });
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories && this.categories.find((cat: any) => cat.id === categoryId);
    return category ? category.name : '';
  }
  
  getBrandName(brandId: string): string {
    const brand = this.brands && this.brands.find((brand: any) => brand.id === brandId);
    return brand ? brand.name : '';
  }

  getCategoryId(categoryName: string): string {
    const category = this.categories.find((cat: any) => cat.name === categoryName);
    return category && category.id ? category.id : '';
  }
  
  getBrandId(brandName: string): string {
    const brand = this.brands.find((brand: any) => brand.name === brandName);
    return brand && brand.id ? brand.id : '';
  }
}
