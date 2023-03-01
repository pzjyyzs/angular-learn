import { ProComponent } from './index/pro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AuthFormComponent } from './content/auth-form/auth-form.component';
import { ContentModule } from './content/content.module';

export const routes: Routes = [
  {
    path: 'index',
    component: ProComponent,
    children: [
      {
        path: 'content',
        component: ContentComponent
      }
    ]
  },

]

@NgModule({
  declarations: [ProComponent],
  imports: [
    ContentModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProModule { }
