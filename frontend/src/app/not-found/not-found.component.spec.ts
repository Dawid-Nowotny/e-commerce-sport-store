import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';

import { NotFoundComponent } from './not-found.component';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../server.service';

describe('CookiesComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let serverService: ServerService;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent, NavBarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ ServerService, Title ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    serverService = TestBed.inject(ServerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set the title to "Strona nie znaleziona - AWAZONsport"', () => {
    spyOn(titleService, 'setTitle');

    component.ngOnInit();

    expect(titleService.setTitle).toHaveBeenCalledWith('Strona nie znaleziona - AWAZONsport');
  });

  
});

