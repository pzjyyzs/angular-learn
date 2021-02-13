import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './heroes/home/home.component';


/* const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
]; */
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./heroes/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: '/home/heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home/heroes',
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
