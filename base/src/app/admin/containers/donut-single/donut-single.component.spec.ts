import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutSingleComponent } from './donut-single.component';

describe('DonutSingleComponent', () => {
  let component: DonutSingleComponent;
  let fixture: ComponentFixture<DonutSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
