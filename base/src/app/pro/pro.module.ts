import { DirectivesComponent } from './directives/directives.component';
import { DirectivesModule } from './directives/directives.module';
import { PipeModule } from './pipe/pipe.module';
import { ProComponent } from './index/pro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AuthFormComponent } from './content/auth-form/auth-form.component';
import { ContentModule } from './content/content.module';
import { PipeComponent } from './pipe/pipe.component';
import { ReactiveFormModule } from './reactive-form/reactive-form.module';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { RouterComponent } from './router/router.component';
import { RouterTestModule } from './router/router-test.module';

export const routes: Routes = [
  {
    path: 'index',
    component: ProComponent,
    children: [
      {
        path: 'content',
        component: ContentComponent
      },
      {
        path: 'pipe',
        component: PipeComponent
      },

      {
        path: 'directives',
        component: DirectivesComponent
      },
      {
        path: 'form',
        component: ReactiveFormComponent
      },
      {
        path: 'router',
        loadChildren: () => import('./router/router-test.module').then(x => x.RouterTestModule)
      }
    ]
  },

]

@NgModule({
  declarations: [ProComponent],
  imports: [
    ContentModule,
    DirectivesModule,
    PipeModule,
    ReactiveFormModule,
    RouterTestModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProModule { }
