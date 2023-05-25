import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private serverService: ServerService) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }
  
  onSubmit() {
    const data = {
      username: this.username,
      password: this.password
    };
  
    this.serverService.login(data).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
        if (response.success == true) {
          // Przekieruj użytkownika na inną stronę lub wykonaj inne działania po udanym logowaniu
        } else {
          this.errorMessage = 'Wystąpił błąd po stronie klienta!';
          this.errorMessage = response.message;
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