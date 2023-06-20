import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';

import { RulesComponent } from './rules.component';
import { ServerService } from '../server.service';

describe('CookiesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesComponent, NavBarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ ServerService ],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
