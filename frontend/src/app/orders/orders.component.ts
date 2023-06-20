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
  isLoading: boolean = false;
  isLogged: boolean = false;
  orders: Order[] = [];
  cart: Cart[][] = [];
  isEmpty: boolean = false;
  
  constructor(private serverService: ServerService,private router: Router) {}

  ngOnInit() {
    this.getOrders();
    this.isLogged = Boolean(localStorage.getItem('isLogged'));
  }

  ngAfterViewInit(): void {
    this.isLogged = Boolean(localStorage.getItem('isLogged'));
  }

  getOrders(): void {
    this.isLoading = true;
    this.serverService.getOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;
        this.cart = response.orders.products;
        this.isLoading = false;
        if(response.orders.length == 0) this.isEmpty = true;
      }
    );
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }
}
