import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutCardComponent } from './donut-card.component';

describe('DonutCardComponent', () => {
  let component: DonutCardComponent;
  let fixture: ComponentFixture<DonutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
