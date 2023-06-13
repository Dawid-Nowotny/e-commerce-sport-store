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
  productId: string = '';
  item: Item[] = [];
  sizes: string[] = [];
  size: string = '';

  constructor(private route: ActivatedRoute, private serverService: ServerService) {}
 
  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.productId = urlSegments[urlSegments.length - 1].toString();
    
      this.serverService.getDetails(this.productId).subscribe(response => {
        this.item = [response.items];
      
      if(this.item[0].category == "Buty")
        this.sizes = Sizes.boots;
      else if(this.item[0].category == "Ubranie")
        this.sizes = Sizes.clothes;
      else if(this.item[0].category == "Piłka")
        this.sizes = Sizes.balls;
      this.size = this.sizes[0];
      });
    });
  }
  
  onSubmit() {
    const data = {
      userId: localStorage.getItem("user_id"),
      productId: this.productId,
      size: this.size
    }

    this.serverService.addToCart(data).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
      }
    );
  }
}

