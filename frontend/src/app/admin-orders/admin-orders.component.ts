import { Component, ChangeDetectorRef } from '@angular/core';
import { ServerService } from '../server.service';
import { Order } from '../order/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: Order[] = [];
  
  constructor(private serverService: ServerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getOrders();
  }

  payOrder(order_id: string): void {
    this.serverService.payOrder(order_id).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response.message);
        this.getOrders();
        this.cdr.detectChanges();
      }
    );
  }

  getOrders(): void {
    this.serverService.getAdminOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;
      }
    );
  }
}
