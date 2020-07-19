import { NgModule } from '@angular/core';
import { HomeModule } from 'src/app/home/home.module';
import { ProductComponent } from './product/component/product/product.component';
import { RecommendModule } from './recommend/recommend.module';
import { ProductModule } from './product/product.module';
import { MyModule } from './my/my.module';
import { ChatModule } from './chat/chat.module';
import { CategoryModule } from './category/category.module';



@NgModule({
  imports: [
    HomeModule,
    RecommendModule,
    ProductModule,
    MyModule,
    ChatModule,
    CategoryModule
  ],
  declarations: [],
  exports: [
    HomeModule,
    RecommendModule,
    ProductModule,
    MyModule,
    ChatModule,
    CategoryModule
  ]
})
export class PageModule { }
