import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  username: string;
  password: string;
  passwordCheck: string;
  errorMessage: string;
  successMessage: string;
  agreedToTerms: boolean = false;

  constructor(private serverService: ServerService, private router: Router) {
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
    this.errorMessage = '';
    this.successMessage = '';
  }
  
  onSubmit() {
    if (!this.username || !this.password || !this.passwordCheck) {
      this.errorMessage = 'Wprowadź nazwę użytkownika i hasło!';
      return;
    } else if (this.password.length < 6) {
      this.errorMessage = 'Hasło musi być dłuższe niż 6 znaków!';
      return;
    } else if (this.password !== this.passwordCheck) {
      this.errorMessage = 'Hasła nie są takie same!';
      return;
    } else if (!this.agreedToTerms) {
      this.errorMessage = 'Musisz zaznaczyć wymagane zgody!';
      return;
    }
    const data = {
      username: this.username,
      password: this.password,
      passwordCheck: this.passwordCheck
    };
  
    this.serverService.register(data).subscribe(
      (response: any) => {
        console.log('Odpowiedź serwera:', response);
        if (response.success == true) {
          this.successMessage = 'Zarejestrowano!';
          this.errorMessage = '';
          this.router.navigate(['/']);
          // Przekieruj użytkownika na inną stronę lub wykonaj inne działania po udanym logowaniu
        } else {
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