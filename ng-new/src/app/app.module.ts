import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// 这是一个类 被@NgModule这个装饰器给装饰 就称为angular module
// 这个装饰器 接受一个对象作为参数  这个对象在angular中 被称为元数据
// 其中的四个属性是用得最多的
// declarations 数组  告诉angular 哪些组件、指令、管道属于这个模块
// 每个组件只能声明在一个Module里 使用得组件必须声明在一个模块中

// imports 导入其他ng module 可以是自己写的 也可以是内置的
// providers 给外界或者自己提供一些服务
// bootstrap 根模块中使用 指定整个项目的根组件
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  
