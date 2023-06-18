import { Component } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { Cart } from '../cart/cart';
import { Order } from '../order/order';
import { DeliveryData } from '../delivery-data/delivery-data';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  isLogged: boolean = false;
  isLoading: boolean = false;
  order: Order[] = [];
  cart: Cart[] = [];
  deliveryData: DeliveryData[] = [];
  successMessage: string = '';

  constructor(private serverService: ServerService,private router: Router) {}
  
  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
  }

  ngOnInit() {
    this.isLoading = true;
    this.serverService.getSuccessfulPayment().subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.order = [response.order];
        this.cart = response.order.products;
        this.deliveryData = [response.order.delivery_details];
        console.log(this.order[0]);
        console.log(this.deliveryData);
        console.log(this.cart);
        this.isLoading = false;
      }
    );
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }

}
