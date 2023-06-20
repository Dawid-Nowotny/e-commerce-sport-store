import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, LoginFormComponent, NavBarComponent ],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ AppComponent, 
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'mockProductId' }),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
