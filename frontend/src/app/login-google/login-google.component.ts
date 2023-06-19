import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../server.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  userId: string | null = null;

  constructor(private route: ActivatedRoute, private serverService: ServerService, private appComponent: AppComponent) {
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {
    if(localStorage.getItem('user_id') != null) {
      this.userId = localStorage.getItem('user_id');
    }

    const data = {
      code: this.route.snapshot.queryParams['code']
    };

    this.serverService.login_google(data).subscribe(
      (response: any) => {
        if (response.success == true) {
          this.successMessage = 'Zalogowano!';
          this.errorMessage = '';
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('user_name', response.user_name);
          this.appComponent.checkState();
        } else {
          this.errorMessage = 'Podano błędny email lub hasło!';
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Błąd:', error);
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'Wystąpił błąd po stronie klienta!';
        } else {
          this.errorMessage = 'Wystąpił błąd po stronie serwera!';
        }
      }
    );
  }
}