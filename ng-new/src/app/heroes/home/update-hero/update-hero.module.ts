import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateHeroRoutingModule } from './update-hero-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateHeroComponent } from './update-hero.component';


@NgModule({
  declarations: [UpdateHeroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UpdateHeroRoutingModule
  ]
})
export class UpdateHeroModule { }
