import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  isLogged: boolean = false;
  admin: boolean = false;
  productId: string = ''
  items: Item[] = [];
  categories: any = '';
  brands: any = '';
  name: string = '';
  brand_id: string = '';
  category_id: string = '';
  price: string = '';
  description: string = '';
  prod_images: File[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    
    if(Boolean(localStorage.getItem('isAdmin'))) {
      this.route.url.subscribe(urlSegments => {
        this.productId = urlSegments[urlSegments.length - 1].toString();
      
        this.serverService.getDetailsForEdit(this.productId).subscribe(response => {
          this.items = [response.items];
          this.name = this.items[0].name;
          this.brand_id = response.items.brand_id;
          this.category_id = response.items.category_id;
          this.price = this.items[0].price.toString();
          this.description = this.items[0].description;
        });
      });
      this.serverService.getBrandsAndCategories().subscribe(response => {
        this.categories = response.categories;
        this.brands = response.brands;
      });
    }
  }
  
  ngAfterViewInit(): void {
    this.isLogged = Boolean(localStorage.getItem('isLogged'))
    this.admin = Boolean(localStorage.getItem('isAdmin'));
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const isDigit = /[0-9]/.test(event.key);
    const isDot = event.key === '.' || event.key === 'Decimal';
    const inputValue = (event.target as HTMLInputElement).value;
  
    if (!isDigit && !allowedKeys.includes(event.key) && !isDot) {
      event.preventDefault();
    }
  
    if (isDot && inputValue.includes('.')) {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    if (this.name === '' || this.brand_id.toString() === null || this.category_id.toString() === null || this.description === '' || this.price === '' || this.prod_images === null) {
      this.errorMessage = 'Wszystkie pola muszą być uzupełnione!';
      this.successMessage = '';
    } else {
      this.errorMessage = '';
      const formData = new FormData();

      formData.append('id', this.productId);
      formData.append('brand_id', this.brand_id.toString());
      formData.append('category_id', this.category_id.toString());
      formData.append('description', this.description);
      formData.append('name', this.name);
      formData.append('price', this.price);
    
      for (let i = 0; i < this.prod_images.length; i++) {
        formData.append('images[]', this.prod_images[i]);
      }
      
      this.serverService.editProduct(formData).subscribe(
        (response: any) => {
          this.successMessage = response.message;
        }
      );
    }
  }

  onFileChange(event: any) {
    this.prod_images = event.target.files;
  }
}
