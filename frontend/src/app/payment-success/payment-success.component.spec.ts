import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';

import { PaymentSuccessComponent } from './payment-success.component';
import { ServerService } from '../server.service';

describe('PaymentSuccessComponent', () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSuccessComponent, NavBarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ ServerService ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
