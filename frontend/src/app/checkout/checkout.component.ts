import { Component, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service';
import { DeliveryData } from '../delivery-data/delivery-data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewInit {
  isLogged: boolean = false;
  firstname: string = '';
  lastname: string = '';
  country: string = '';
  city: string = '';
  street: string = '';
  houseNumber: string = '';
  postcode: string = '';
  phoneNumber: string = '';
  errorMessage: string = '';

  constructor(private serverService: ServerService) {}

  ngAfterViewInit(): void {
    this.isLogged = this.serverService.isLogged;
  }

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

    const validationResult = this.validateData(data);
    
    if (validationResult == 'success') {
      this.errorMessage = "";
      this.serverService.setDeliveryData(data).subscribe(
        (response: any) => {
          if(response.success == true) {
            this.serverService.addOrder(response.delivery_id).subscribe(
              (response: any) => {
                if(response.success == true) {
                  localStorage.setItem('order_id', response.order_id);
                  this.serverService.payment(response.order_id).subscribe(
                    (response: any) => {
                      window.location.href = response.url;
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      this.errorMessage = validationResult;
    }
  }

  validateData(data: DeliveryData): string {
    if (!this.areAllFieldsFilled(data)) 
      return 'Musisz uzupełnić wszystkie pola!';

    if (!this.isValidPostcode(data.postcode)) 
      return 'Nieprawidłowy format kodu pocztowego!';
    
    if (!this.isValidPhoneNumber(data.phoneNumber)) 
      return 'Nieprawidłowy format numeru telefonu!';

    return 'success';
  }

  areAllFieldsFilled(data: DeliveryData): boolean {
    return (
      data.firstname !== '' &&
      data.lastname !== '' &&
      data.country !== '' &&
      data.city !== '' &&
      data.street !== '' &&
      data.houseNumber !== '' &&
      data.postcode !== '' &&
      data.phoneNumber !== ''
    );
  }

  isValidPostcode(postcode: string): boolean {
    var postcodeRegex = /^\d{2}-\d{3}$/;
    return postcodeRegex.test(postcode);
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    var phoneNumberRegex = /^\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
}