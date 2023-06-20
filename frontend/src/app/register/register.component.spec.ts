import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ServerService } from '../server.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent, NavBarComponent, RegisterFormComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ ServerService ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
