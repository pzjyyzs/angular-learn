import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroesModule } from '../heroes/heroes.module';
import { AddUpdateHeroComponent } from './add-update-hero/add-update-hero.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, AddUpdateHeroComponent],
  imports: [
  HeroesModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
