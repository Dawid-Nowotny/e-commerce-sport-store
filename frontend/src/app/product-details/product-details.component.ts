import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId: string;
  size: number;

  constructor(private route: ActivatedRoute, private serverService: ServerService) {
    this.productId = "";
    this.size = 0;
  }
  items: Item[] = [];
  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.productId = urlSegments[urlSegments.length - 1].toString();
    
      this.serverService.getDetails(this.productId).subscribe(response => {
        this.items = [response.items];
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

