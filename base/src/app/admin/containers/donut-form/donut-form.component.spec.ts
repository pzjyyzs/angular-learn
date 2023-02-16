import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutFormComponent } from './donut-form.component';

describe('DonutFormComponent', () => {
  let component: DonutFormComponent;
  let fixture: ComponentFixture<DonutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
