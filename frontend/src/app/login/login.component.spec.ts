import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ServerService } from '../server.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, NavBarComponent, LoginFormComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ ServerService ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
