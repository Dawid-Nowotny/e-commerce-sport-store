import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../server.service';
import { AppComponent } from '../app.component';

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
  userId: string | null = null;

  constructor(private serverService: ServerService, private router: Router, private appComponent: AppComponent) {
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {
    if(localStorage.getItem('user_id') != null) {
      this.userId = localStorage.getItem('user_id');
    }
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
        if (response.success == true) {
          this.successMessage = 'Zarejestrowano!';
          this.errorMessage = '';
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('user_name', response.user_name);
          this.appComponent.checkState();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'Wystąpił błąd po stronie klienta!';
        } else {
          this.errorMessage = 'Wystąpił błąd po stronie serwera!';
        }
      }
    );
  }
} 