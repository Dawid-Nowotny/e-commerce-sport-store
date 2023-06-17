import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when form fields are empty', () => {
    component.onSubmit();
    expect(component.errorMessage).toBe('Wprowadź nazwę użytkownika i hasło!');
  });

  it('should display an error message when password is too short', () => {
    component.username = 'testuser';
    component.password = '12345';
    component.passwordCheck = '12345';
    component.onSubmit();
    expect(component.errorMessage).toBe('Hasło musi być dłuższe niż 6 znaków!');
  });

  it('should display an error message when passwords do not match', () => {
    component.username = 'testuser';
    component.password = 'password';
    component.passwordCheck = 'differentpassword';
    component.onSubmit();
    expect(component.errorMessage).toBe('Hasła nie są takie same!');
  });

  it('should display an error message when terms are not agreed', () => {
    component.username = 'testuser';
    component.password = 'password';
    component.passwordCheck = 'password';
    component.agreedToTerms = false;
    component.onSubmit();
    expect(component.errorMessage).toBe('Musisz zaznaczyć wymagane zgody!');
  });

});
