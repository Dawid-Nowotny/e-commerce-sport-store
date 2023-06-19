import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShopCartComponent } from './shop-cart.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ShopCartComponent', () => {
  let component: ShopCartComponent;
  let fixture: ComponentFixture<ShopCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCartComponent, NavBarComponent],
      imports: [HttpClientTestingModule],
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

    fixture = TestBed.createComponent(ShopCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
