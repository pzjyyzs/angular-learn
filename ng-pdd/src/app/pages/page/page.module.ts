import { NgModule } from '@angular/core';
import { HomeModule } from 'src/app/home/home.module';
import { RecommendComponent } from './recommend/component/recommend/recommend.component';
import { ProductComponent } from './product/component/product/product.component';
import { MyComponent } from './my/component/my/my.component';
import { ChatComponent } from './chat/component/chat/chat.component';
import { CategoryComponent } from './category/component/category/category.component';
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
