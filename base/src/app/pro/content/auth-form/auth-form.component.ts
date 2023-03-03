import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { User } from './auth-form.interface';
import { AuthMessageComponent } from './auth-message/auth-message.component';
import { AuthRememberComponent } from './auth-remember/auth-remember.component';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.less']
})
export class AuthFormComponent implements OnInit, AfterContentInit, AfterViewInit {

  // single component
  @ViewChild(AuthMessageComponent) message: AuthMessageComponent | undefined;
  // many component
  // @ViewChildren(AuthMessageComponent) msgArr: QueryList<AuthMessageComponent> | undefined;

  // single element
  @ViewChild('email') email: ElementRef | undefined;
  // single content child
  /* @ContentChild(AuthRememberComponent) remember: AuthRememberComponent | undefined; */

  // many AuthRememberComponent content
  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent> | undefined;
  @Output() submitted = new EventEmitter<User>();
  showMessage: boolean = false;
  constructor(
    private renderer: Renderer2,
    private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {

    console.log(this.email)
    // use ElementRef nativeElement
    // this.email?.nativeElement.setAttribute('placeholder', 'Enter your email address');
    //  renderer  can use in different platform
    this.renderer.setAttribute(this.email?.nativeElement, 'placeholder', 'Enter your email address');
    this.renderer.selectRootElement(this.email?.nativeElement).focus();
    if (this.message) {
      this.message.days = 30;
    }

    /* if (this.msgArr) {
      this.msgArr?.forEach(message => {
        message.days = 30;
      })
    } */
    this.cd.detectChanges();
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {

    if (this.remember) {
      /* this.remember.checked.subscribe((checked: boolean) => {
        this.showMessage = checked;
      }) */
      this.remember.forEach(item => {
        item.checked.subscribe(checked => this.showMessage = checked);
      })
    }
  }
  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
