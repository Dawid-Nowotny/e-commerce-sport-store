import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { ActivatedRoute } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { of } from 'rxjs';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent, NavBarComponent],
      providers: [Title,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'mockProductId' }),
          },
        },],
 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title); // Inject Title service
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
