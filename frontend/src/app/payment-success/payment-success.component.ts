import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';
import { Order } from '../order/order';
import { DeliveryData } from '../delivery-data/delivery-data';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  order: Order[] = [];
  deliveryData: DeliveryData[] = [];

  constructor(private titleService: Title, private serverService: ServerService) {}
  
  ngOnInit() {
    this.serverService.getSuccessfulPayment().subscribe(
      (response: any) => {
        console.log(response);
        this.order = response.order;
        this.deliveryData = response.order.delivery_details;
        console.log(this.order);
        console.log(this.deliveryData);
      }
    );
  }
}
