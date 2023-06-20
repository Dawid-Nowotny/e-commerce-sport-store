import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

import { LoginGoogleComponent } from './login-google.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

describe('LoginGoogleComponent', () => {
  let component: LoginGoogleComponent;
  let fixture: ComponentFixture<LoginGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginGoogleComponent, NavBarComponent],
      imports: [HttpClientTestingModule],
      providers: [ AppComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: { get: () => 'mockQueryParamValue' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
