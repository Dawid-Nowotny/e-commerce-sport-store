import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  constructor(private titleService: Title, private serverService: ServerService, private router: Router, private cdr: ChangeDetectorRef) { }
  cart: Cart[] = [];
  totalPrice: number = 0;
  selectedOption: number[] = [];
  maxAmount: number[][] = [];

  ngOnInit() {
    this.titleService.setTitle('Koszyk - AWAZONsport');
    this.getCart();
  }

  getCart(): void {
    this.serverService.getCart().subscribe(response => {
      if(response.success == false) {
        alert("nie zalogowany");
      } else {
        this.cart = response.cart;
        this.totalPrice = response.total_price;
        console.log(this.cart);
        for(let i = 0; i < this.cart.length; i++) {
          this.selectedOption[i] = this.cart[i].amount;
        }
        if(this.cart.length == 0) {
          alert("koszyk pusty");
        }
      }
      this.getRange();
    });
  }

  getRange(): void {
    for (let i = 0; i < this.cart.length; i++) {
      this.maxAmount[i] = [];
      for (let j = 1; j < this.cart[i].stock_amount && j <= 10; j++) {
        this.maxAmount[i].push(j);
      }
    }
  }

  deleteProductFromCart(productId: string, size: string): void {
    this.serverService.deleteProductFromCart(productId, size).subscribe(response => {
        console.log('Odpowiedź serwera:', response.message);
        this.getCart();
        this.cdr.detectChanges();
      }
    );
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }

  setProductAmount(productId: string, size: string, amount: number): void {
    this.serverService.setProductAmount(productId, size, amount).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
        this.getCart();
      }
    );
  }
}