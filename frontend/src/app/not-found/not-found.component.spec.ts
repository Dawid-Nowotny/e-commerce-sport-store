import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [Title], // Add Title provider
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
