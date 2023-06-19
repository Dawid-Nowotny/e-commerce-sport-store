import { Component } from '@angular/core';
import { ServerService } from '../server.service';
import { Order } from '../order/order';
import { Router } from '@angular/router';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  isLogged: boolean = false;
  orders: Order[] = [];
  cart: Cart[][] = [];
  
  constructor(private serverService: ServerService,private router: Router) {}

  ngOnInit() {
    this.getOrders();
  }

  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
  }


  getOrders(): void {
    this.serverService.getOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;
        this.cart = response.orders.products;
        console.log(response.orders);
        for (let i = 0; i < this.orders.length; i++) {
          this.cart[i].push(response.orders.products);
        }
      }
    );
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }
}
