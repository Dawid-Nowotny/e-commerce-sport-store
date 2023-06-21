import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NavBarComponent } from './nav-bar.component';
import { Title } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ brand: 'mockBrand', category: 'mockCategory' }),
          },
        },
        Title,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);

    component.itemId = 'mockItemId';
    component.itemName = 'mockItemName';
    component.itemCategory = 'mockCategory';
    component.itemBrand = 'mockBrand';
    component.notFound = 'mockNotFound';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
