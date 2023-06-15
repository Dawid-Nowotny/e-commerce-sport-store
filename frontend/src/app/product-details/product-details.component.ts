import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Item } from '../item/item';
import { Sizes } from '../sizes/sizes';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  isLoading: boolean = false;
  productId: string = '';
  item: Item[] = [];
  sizes: string[] = [];
  size: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private serverService: ServerService) {}
 
  ngOnInit() {
    this.isLoading = true;
    this.route.url.subscribe(urlSegments => {
      this.productId = urlSegments[urlSegments.length - 1].toString();
  
      this.serverService.getDetails(this.productId).subscribe(response => {
        this.item = [response.items];
        if (this.item[0].category == "Buty")
          this.sizes = Sizes.boots;
        else if (this.item[0].category == "Ubranie")
          this.sizes = Sizes.clothes;
        else if (this.item[0].category == "Piłka")
          this.sizes = Sizes.balls;
  
        if (this.isAvailable(this.size)) {
          this.size = this.size; 
        } else {
          this.size = ''; 
        }
        
        this.isLoading = false;
      });
    });
  }

  isAvailable(size: string): boolean {
    if (this.item[0].sizes_and_amounts[this.parseSize(size)]) {
      return true;
    } else {
      return false;
    }
  }

  parseSize(size: string): number {
    const sizeMap: { [key: string]: number } = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
      XXL: 6,
    };

    const numericValue = parseInt(size, 10);
    if (!isNaN(numericValue)) {
      return numericValue;
    }
  
    return sizeMap[size as keyof typeof sizeMap] || 0;
  }
  
  onSubmit() {
    const data = {
      userId: localStorage.getItem("user_id"),
      productId: this.productId,
      size: this.size.toString()
    }

    if(data.size) {
      this.serverService.addToCart(data).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = "";
        }
      );
    } else {
      this.successMessage = "";
      this.errorMessage = "Musisz wybrać rozmiar!";
    }
  }
}

