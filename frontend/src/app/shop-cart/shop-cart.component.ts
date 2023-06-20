import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  constructor(private serverService: ServerService, private router: Router, private cdr: ChangeDetectorRef) { }
  isLoading: boolean = false;
  isLogged: boolean = false;
  cart: Cart[] = [];
  totalPrice: number = 0;
  selectedOption: number[] = [];
  maxAmount: number[][] = [];
  errorMessage: string = '';
  successMessage: string = '';
  cartMessage: string = '';

  ngOnInit() {
    this.getCart();
  }

  ngAfterViewInit(): void {
    this.isLogged = Boolean(localStorage.getItem('isLogged'));
  }

  getCart(): void {
    this.isLoading = true;
    this.serverService.getCart().subscribe(response => {
      if(response.success !== false) {
        this.cart = response.cart;
        this.totalPrice = response.total_price;
        for(let i = 0; i < this.cart.length; i++) {
          this.selectedOption[i] = this.cart[i].amount;
        }
        if(this.cart.length == 0) {
          this.cartMessage = "Brak produktów w koszyku!";
        }
      } else {
        this.cartMessage = "Brak produktów w koszyku!";
      }
      this.getRange();
      this.isLoading = false;
    });
  }

  getRange(): void {
    for (let i = 0; i < this.cart.length; i++) {
      this.maxAmount[i] = [];
      for (let j = 1; j <= this.cart[i].stock_amount && j <= 10; j++) {
        this.maxAmount[i].push(j);
      }
    }
  }

  deleteProductFromCart(productId: string, size: string): void {
    this.serverService.deleteProductFromCart(productId, size).subscribe(response => {
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
        this.getCart();
      }
    );
  }
}