import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferPanelComponent } from './components/transfer/transfer-panel/transfer-panel.component';
import { ExampleComponent } from './components/example/example.component';
import { StructuralComponent } from './components/structural/structural.component';
import { UnlessDirective } from './directives/unless.directive';
import { TplContainerComponent } from './components/tpl-container/tpl-container.component';
import { LifeCycleComponent } from './components/life-cycle/life-cycle.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { LayoutComponent } from './heroes/layout/layout.component';
import { HerosComponent } from './heroes/heros/heros.component';
import { FormsModule } from '@angular/forms';
import { ExmpleComponent } from './rxjs/exmple/exmple.component';
import { HeroListComponent } from './router/hero-list/hero-list.component';
import { HeroModule } from './router/hero.module';
import { CrisisCenterModule } from './router/crisis-center/crisis-center.module';
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
    AppComponent,
    TransferPanelComponent,
    ExampleComponent,
    StructuralComponent,
    UnlessDirective,
    TplContainerComponent,
    LifeCycleComponent,
    TransferComponent,
    LayoutComponent,
    HerosComponent,
    ExmpleComponent,
  ],
  imports: [
    BrowserModule,
    HeroModule,
    CrisisCenterModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
