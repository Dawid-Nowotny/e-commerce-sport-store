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
  errorMessage: string = '';
  orderId: string | null = '';

  constructor(private serverService: ServerService,private router: Router) {}
  
  ngAfterViewInit(): void {
    this.isLogged = Boolean(localStorage.getItem('isLogged'));
  }

  ngOnInit() {
    this.orderId = localStorage.getItem('order_id');
    if(this.orderId !== null) {
      this.isLoading = true;
      this.serverService.getSuccessfulPayment().subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.order = [response.order];
          this.cart = response.order.products;
          this.deliveryData = [response.order.delivery_details];
          this.isLoading = false;
        }
      );
    } 
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }

}
