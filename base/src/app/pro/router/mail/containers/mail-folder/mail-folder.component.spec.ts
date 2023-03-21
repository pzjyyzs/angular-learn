import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailFolderComponent } from './mail-folder.component';

describe('MailFolderComponent', () => {
  let component: MailFolderComponent;
  let fixture: ComponentFixture<MailFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
