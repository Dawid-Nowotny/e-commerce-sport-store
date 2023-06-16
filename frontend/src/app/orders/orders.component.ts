import { Component } from '@angular/core';
import { ServerService } from '../server.service';
import { Order } from '../order/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  
  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.serverService.getOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;
      }
    );
  }
}
