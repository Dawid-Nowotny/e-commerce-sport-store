import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  successMessage: string;

  constructor(private serverService: ServerService, private router: Router) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  loginWithGoogle() {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=629378831847-cei868ra5f7ih23gu6jb5cu7r3otcaao.apps.googleusercontent.com&redirect_uri=http://localhost:4200/login-google&response_type=code&scope=openid%20email%20profile';
  }
  
  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Wprowadź nazwę użytkownika i hasło!';
      return;
    } 

    const data = {
      username: this.username,
      password: this.password
    };
  
    this.serverService.login(data).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
        if (response.success == true) {
          this.successMessage = 'Zalogowano!';
          this.errorMessage = '';
          localStorage.setItem("user_id", response.user_id);
          this.router.navigate(['/']);
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