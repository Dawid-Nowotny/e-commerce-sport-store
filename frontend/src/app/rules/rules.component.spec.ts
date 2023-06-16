import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesComponent } from './rules.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component'; // Dodaj import NavBarComponent

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RulesComponent, NavBarComponent], // Dodaj NavBarComponent do declarations
    }).compileComponents();

    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
