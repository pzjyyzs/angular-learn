import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailItemComponent } from './mail-item.component';

describe('MailItemComponent', () => {
  let component: MailItemComponent;
  let fixture: ComponentFixture<MailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
