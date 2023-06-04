import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  constructor(private route: ActivatedRoute, private serverService: ServerService) {
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {
    const data = {
      code: this.route.snapshot.queryParams['code']
    };

    this.serverService.login_google(data).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
        if (response.success == true) {
          this.successMessage = 'Zalogowano!';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Podano błędny email lub hasło!';
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Błąd:', error);
        if (error.error instanceof ErrorEvent) {
          // Błąd po stronie klienta
          //this.errorMessage = 'Wystąpił błąd po stronie klienta: ' + error.error.message;
          this.errorMessage = 'Wystąpił błąd po stronie klienta!';
        } else {
          // Błąd po stronie serwera
          //this.errorMessage = 'Wystąpił błąd po stronie serwera. Kod błędu: ' + error.status + ', wiadomość: ' + error.message;
          this.errorMessage = 'Wystąpił błąd po stronie serwera!';
        }
      }
    );
  }
}