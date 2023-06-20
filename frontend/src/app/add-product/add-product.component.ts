import { Component,HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  id: string = '';
  brand_id: string = '';
  category_id: number = 0;
  description: string = '';
  name: string = '';
  price: string = '';
  prod_images: File[] = [];
  categories: any = '';
  brands: any = '';
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getBrandsAndCategories().subscribe(response => {
      this.categories = response.categories;
      this.category_id = this.categories[0].id;
      this.brands = response.brands;
      this.brand_id = this.brands[0].id;
    });
  }

  ngAfterViewInit(): void {
    this.isLogged = Boolean(localStorage.getItem('isLogged'));
    this.isAdmin = Boolean(localStorage.getItem('isAdmin'));
  }

  onFileChange(event: any) {
    this.prod_images = event.target.files;
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
    } else {
      const formData = new FormData();
    
      formData.append('id', this.id.toString());
      formData.append('brand_id', this.brand_id.toString());
      formData.append('category_id', this.category_id.toString());
      formData.append('description', this.description);
      formData.append('name', this.name);
      formData.append('price', this.price);
    
      for (let i = 0; i < this.prod_images.length; i++) {
        formData.append('images[]', this.prod_images[i]);
      }
      
      this.serverService.addProduct(formData).subscribe(
        (response: any) => {
          this.errorMessage = '';
          this.successMessage = 'Produkt został dodany!';
          this.name = '';
          this.brand_id = this.brands[0].id;
          this.category_id = this.categories[0].id;
          this.description = '';
          this.price = '';
          this.prod_images = [];
        }
      );
    }
  }
}