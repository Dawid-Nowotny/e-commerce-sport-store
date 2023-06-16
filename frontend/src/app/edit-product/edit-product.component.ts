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

  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.productId = urlSegments[urlSegments.length - 1].toString();
    
      this.serverService.getDetailsForEdit(this.productId).subscribe(response => {
        console.log(response.items.brand_id);
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
      console.log(this.brands);
    });
  }

  onSubmit(): void {
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
        console.log('Odpowiedź serwera:', response);
      }
    );
  }

  onFileChange(event: any) {
    this.prod_images = event.target.files;
  }
}
