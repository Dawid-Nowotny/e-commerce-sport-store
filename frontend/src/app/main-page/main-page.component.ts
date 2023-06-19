import { Component, OnInit, ChangeDetectorRef, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ServerService } from '../server.service';
import { Item } from '../item/item';
import { Sizes } from '../sizes/sizes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
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

  
  constructor(private serverService: ServerService, private router: Router, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit() {
    this.serverService.getBrandsAndCategories().subscribe(response => {
      this.categories = [{id: '', name: 'Wszystkie'}].concat(response.categories);
      this.brands = [{id: '', name: 'Wszystkie'}].concat(response.brands);

      this.route.queryParamMap.subscribe(params => {
        this.category_id = this.getCategoryId(params.get('category') || '');
        this.brand_id = this.getBrandId(params.get('brand') || '');
        if (this.brand_id != '') {
          this.filter += '&brand=' + this.brand_id;
        }
        if (this.category_id != '') {
          this.filter += '&category=' + this.category_id;
        }
        if((params.get('category') || '') == 'Wszystkie' && (params.get('brand') || '') == 'Wszystkie') this.filter = '';
        this.getFilteredList();
      });
    });
  }

  ngAfterViewInit(): void {
    const filtersDropdownContent = document.querySelector('.filters-dropdown-content') as HTMLElement;
    const filtersDropdownButton = document.querySelector('.filters-dropdown-button') as HTMLElement;
    const sortingDropdownContent = document.querySelector('.sorting-dropdown-content') as HTMLElement;
    const sortingDropdownButton = document.querySelector('.sorting-dropdown-button') as HTMLElement;

    filtersDropdownButton.addEventListener('click', function() {
      if (filtersDropdownContent.style.display === 'none') {
        filtersDropdownContent.style.display = 'block';
      } else {
        filtersDropdownContent.style.display = 'none';
      }
    });

    sortingDropdownButton.addEventListener('click', function() {
      if (sortingDropdownContent.style.display === 'none') {
        sortingDropdownContent.style.display = 'block';
      } else {
        sortingDropdownContent.style.display = 'none';
      }
    });

    filtersDropdownContent.style.display = 'block';
    sortingDropdownContent.style.display = 'block';
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

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchProducts();
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