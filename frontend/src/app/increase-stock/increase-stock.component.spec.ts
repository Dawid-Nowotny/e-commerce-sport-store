import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IncreaseStockComponent } from './increase-stock.component';

describe('IncreaseStockComponent', () => {
  let component: IncreaseStockComponent;
  let fixture: ComponentFixture<IncreaseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncreaseStockComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ subscribe: (fn: any) => fn({ get: () => 'mockProductId' }) }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
