import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WySlideComponent } from './wy-slide.component';

describe('WySlideComponent', () => {
  let component: WySlideComponent;
  let fixture: ComponentFixture<WySlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WySlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WySlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
