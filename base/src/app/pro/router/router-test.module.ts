import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailItemComponent } from './mail/components/mail-item/mail-item.component';
import { MailFolderComponent } from './mail/containers/mail-folder/mail-folder.component';
import { MailAppComponent } from './mail/components/mail-app/mail-app.component';
import { RouterComponent } from './router.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folder',
    component: RouterComponent,
    children: [
      { path: 'folder/:name', component: MailFolderComponent }
    ]
  }
]

@NgModule({
  declarations: [
    RouterComponent,
    MailAppComponent,
    MailItemComponent,
    MailFolderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RouterTestModule { }
