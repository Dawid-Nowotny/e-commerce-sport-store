import { Component, ChangeDetectorRef } from '@angular/core';
import { ServerService } from '../server.service';
import { Order } from '../order/order';
import { Router } from '@angular/router';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  isLoading: boolean = false;
  orders: Order[] = [];
  cart: Cart[][] = [];
  isLogged: boolean = false;
  admin: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(private serverService: ServerService, private cdr: ChangeDetectorRef,private router: Router) {}

  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
    this.admin = this.serverService.admin;
  }

  ngOnInit() {
    if(this.serverService.admin == true) {
      this.getOrders();
    }
  }

  payOrder(order_id: string): void {
    this.serverService.payOrder(order_id).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response.message);
        if(response.success == true) {
          this.successMessage = response.message;
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = response.message;
        }

        this.getOrders();
        this.cdr.detectChanges();
      }
    );
  }

  getOrders(): void {
    this.isLoading = true;
    this.serverService.getAdminOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;
        this.cart = response.orders.products;
        this.isLoading = false;
      }
    );
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }
}
