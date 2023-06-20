import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { RouterTestingModule } from '@angular/router/testing';

import { EditProductComponent } from './edit-product.component';
import { ServerService } from '../server.service';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let serverService: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductComponent, NavBarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ ServerService ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
