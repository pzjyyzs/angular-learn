import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddHeroRoutingModule } from './add-hero-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddHeroComponent } from './add-hero.component';


@NgModule({
  declarations: [AddHeroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddHeroRoutingModule
  ]
})
export class AddHeroModule { }
