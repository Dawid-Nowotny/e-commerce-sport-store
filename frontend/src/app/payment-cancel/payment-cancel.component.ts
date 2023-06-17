import { Component } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent {
  constructor(private serverService: ServerService) {}
  
  ngOnInit() {
    this.serverService.putCancelledPayment().subscribe (
      (response: any) => {
        console.log(response);
      }
    );
  }
}