import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginFormComponent } from './login-form.component';
import { ServerService } from '../server.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let serverService: ServerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ServerService, Router],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when username or password is empty', () => {
    component.onSubmit();
    expect(component.errorMessage).toBe('Wprowadź nazwę użytkownika i hasło!');
  });

  it('should call serverService.login with correct data and display success message', () => {
    const mockResponse = { success: true, user_id: '123' };
    spyOn(serverService, 'login').and.returnValue(of(mockResponse));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');

    component.username = 'testuser';
    component.password = 'password';
    component.onSubmit();

    expect(serverService.login).toHaveBeenCalledWith({
      username: component.username,
      password: component.password,
    });
    expect(component.successMessage).toBe('Zalogowano!');
    expect(component.errorMessage).toBe('');
    expect(localStorage.setItem).toHaveBeenCalledWith('user_id', mockResponse.user_id);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call serverService.login and display error message from server response', () => {
    const mockResponse = { success: false };
    spyOn(serverService, 'login').and.returnValue(of(mockResponse));

    component.username = 'testuser';
    component.password = 'wrongpassword';
    component.onSubmit();

    expect(serverService.login).toHaveBeenCalledWith({
      username: component.username,
      password: component.password,
    });
    expect(component.errorMessage).toBe('Podano błędny email lub hasło!');
  });

});
