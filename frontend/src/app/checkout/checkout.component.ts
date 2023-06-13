import { Component } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  firstname: string = '';
  lastname: string = '';
  country: string = '';
  city: string = '';
  street: string = '';
  houseNumber: string = '';
  postcode: string = '';
  phoneNumber: string = '';

  constructor(private serverService: ServerService) {}

  goToTransaction(): void {
    const data = {
      user_id: localStorage.getItem('user_id'),
      firstname: this.firstname,
      lastname: this.lastname,
      country: this.country,
      city: this.city,
      street: this.street,
      houseNumber: this.houseNumber,
      postcode: this.postcode,
      phoneNumber: this.phoneNumber
    }
    console.log(data);
    this.serverService.setDeliveryData(data).subscribe(
      (response: any) => {
        if(response.success == true) {
          this.serverService.addOrder(response.delivery_id).subscribe(
            (response: any) => {
              console.log(response);
            }
          );
        }
      }
    )
  }
}
