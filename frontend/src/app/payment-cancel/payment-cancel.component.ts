import { Component, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent implements AfterViewInit {
  isLogged: boolean = false;
  constructor(private serverService: ServerService) {}
  
  ngOnInit() {
    this.serverService.putCancelledPayment().subscribe (
      (response: any) => {
        console.log(response);
      }
    );
  }

  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
  }
}