import { Component, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent implements AfterViewInit {
  isLogged: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  orderId: string | null = '';
  constructor(private serverService: ServerService) {}
  
  ngOnInit() {
    this.orderId = localStorage.getItem('order_id');
    this.serverService.putCancelledPayment().subscribe (
      (response: any) => {
      }
    );
  }

  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
  }
}