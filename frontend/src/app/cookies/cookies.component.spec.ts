import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesComponent } from './cookies.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CookiesComponent', () => {
  let component: CookiesComponent;
  let fixture: ComponentFixture<CookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesComponent, NavBarComponent ],
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

    fixture = TestBed.createComponent(CookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
