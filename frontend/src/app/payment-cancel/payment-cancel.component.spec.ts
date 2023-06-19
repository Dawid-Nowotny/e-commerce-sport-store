import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentCancelComponent } from './payment-cancel.component';

describe('PaymentCancelComponent', () => {
  let component: PaymentCancelComponent;
  let fixture: ComponentFixture<PaymentCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCancelComponent, NavBarComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'mockProductId' }),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
