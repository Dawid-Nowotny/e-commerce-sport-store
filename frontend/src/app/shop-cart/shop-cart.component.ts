import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { Item } from '../item/item';
import { Items } from '../items/items';
import { Cart } from '../cart/cart';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  constructor(private titleService: Title, private serverService: ServerService, private router: Router) { }
  cart: Cart[] = [];
  selectedOption: number = 0;

  ngOnInit() {
    this.titleService.setTitle('Koszyk - AWAZONsport');
    
    this.serverService.getCart().subscribe(response => {
      if(response.success == false) {
        alert("nie zalogowany");
      }
      else{
        this.cart = response.cart;
        if(this.cart.length == 0) {
          alert("koszyk pusty");
        }
      }
    });
  }

  deleteProductFromCart(productId: string, size: string): void {
    this.serverService.deleteProductFromCart(productId, size).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
      }
    );
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }

  getRange(amount: number): number[] {
    let array: number[] = [];
    for(let i = 1; i < amount && i <= 10; i++) {
      array.push(i);
    }
    return array;
  }

  setProductAmount(productId: string, size: string, amount: number): void {
    this.serverService.setProductAmount(productId, size, amount).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
      }
    );
  }
}