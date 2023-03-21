import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAppComponent } from './mail-app.component';

describe('MailAppComponent', () => {
  let component: MailAppComponent;
  let fixture: ComponentFixture<MailAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
