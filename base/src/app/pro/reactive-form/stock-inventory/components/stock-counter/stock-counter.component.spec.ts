import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCounterComponent } from './stock-counter.component';

describe('StockCounterComponent', () => {
  let component: StockCounterComponent;
  let fixture: ComponentFixture<StockCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
