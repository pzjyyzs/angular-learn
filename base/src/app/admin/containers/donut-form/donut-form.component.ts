import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donut-form',
  templateUrl: './donut-form.component.html',
  styleUrls: ['./donut-form.component.less']
})
export class DonutFormComponent implements OnInit {

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-superme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon'
  ]
  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(form: NgForm) {
    if (form.valid) {

    } else {
      form.form.markAllAsTouched();
    }
  }
}
