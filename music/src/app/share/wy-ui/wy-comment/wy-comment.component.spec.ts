import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyCommentComponent } from './wy-comment.component';

describe('WyCommentComponent', () => {
  let component: WyCommentComponent;
  let fixture: ComponentFixture<WyCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WyCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
