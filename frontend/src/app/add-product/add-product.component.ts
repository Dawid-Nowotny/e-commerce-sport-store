import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  id: string = '';
  brand_id: string = '';
  category_id: number = 0;
  description: string = '';
  name: string = '';
  price: string = '';
  prod_images: File[] = [];
  
  constructor(private titleService: Title, private serverService: ServerService) { }
  categories: any = '';
  brands: any = '';

  ngOnInit() {
    this.titleService.setTitle('Dodaj produkt - AWAZONsport');
    this.serverService.getBrandsAndCategories().subscribe(response => {
      this.categories = response.categories;
      this.brands = response.brands;
    });
  }

  onFileChange(event: any) {
    this.prod_images = event.target.files;
  }

  onSubmit(): void {
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
        console.log('Odpowiedź serwera:', response);
      }
    );
  }
}