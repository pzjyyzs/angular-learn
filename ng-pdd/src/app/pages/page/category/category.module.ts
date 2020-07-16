import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { CategoryComponent } from './component/category/category.component';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    ShareModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
