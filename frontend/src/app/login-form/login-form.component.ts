import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../server.service';
import { AppComponent } from '../app.component';

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
  userId: string | null = null;

  constructor(private serverService: ServerService, private router: Router, private appComponent: AppComponent) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {
    if(localStorage.getItem('user_id') != null) {
      this.userId = localStorage.getItem('user_id');
    }
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
        if (response.success == true) {
          this.successMessage = 'Zalogowano!';
          this.errorMessage = '';
          localStorage.setItem("isLogged", 'true');
          localStorage.setItem("user_id", response.user_id);
          localStorage.setItem("user_name", response.user_name);
          this.appComponent.checkState();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Podano błędny email lub hasło!';
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