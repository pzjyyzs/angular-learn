import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyModalComponent } from './wy-modal.component';

describe('WyModalComponent', () => {
  let component: WyModalComponent;
  let fixture: ComponentFixture<WyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
