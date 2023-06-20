import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OrdersComponent } from './orders.component';
import { ServerService } from '../server.service';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ OrdersComponent, NavBarComponent],
      providers: [ ServerService ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService); // Wstrzyknij zmockowany serverService
    fixture.detectChanges();
  });

  it('should create', () => {
    const mockResponse = {
      orders: [
        // Tutaj umieść dane testowe
      ]
    };
    spyOn(serverService, 'getOrders').and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component).toBeTruthy();
  });
});
