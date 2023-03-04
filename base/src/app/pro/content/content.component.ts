import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/auth-form.interface';
import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit, AfterViewInit {

  // read 当读取这个元素的时候 返回一个什么类型给你 例如 entry 如果不指定 它会默认返回ElementRef;它只支持几个固定的值
  @ViewChild('entry', { read: ViewContainerRef, static: true }) entry!: ViewContainerRef;
  @ViewChild('tmpl', { static: true }) tmpl!: TemplateRef<any>;
  rememberMe: boolean = false;
  component!: ComponentRef<AuthFormComponent>;
  ctx = {
    $implicit: 'container',
    location: 'liuzhou'
  }
  constructor() { }
  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    /*  // 动态组件
     this.component = this.entry.createComponent(AuthFormComponent);
     // 动态组件传参
     console.log(this.component.instance);
     // 动态组件事件订阅
     this.component.instance.submitted.subscribe(this.loginUser); */

    //element insert ng-template
    if (this.entry && this.tmpl) {
      console.log(this.entry, this.tmpl)
      this.entry.createEmbeddedView(this.tmpl, {
        $implicit: 'test', // 代表没指定别名的那一个
        location: 'china'
      });
    }
  }
  ngOnInit(): void {
  }

  createUser(user: User) {

  }

  loginUser(user: User) {

  }

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  destoryComponent() {
    // 销毁动态组件
    this.component.destroy();
  }
}
