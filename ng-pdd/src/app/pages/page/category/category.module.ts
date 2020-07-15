import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';


@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
