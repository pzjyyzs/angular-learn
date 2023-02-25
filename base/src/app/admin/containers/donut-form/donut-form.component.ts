import { Donut } from './../../models/donut';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donut-form',
  templateUrl: './donut-form.component.html',
  styleUrls: ['./donut-form.component.less']
})
export class DonutFormComponent implements OnInit {

  @Input() donut!: Donut;
  @Input() isEdit!: boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();
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

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value })
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    if (confirm(`Really delete ${this.donut.name}?`)) {
      this.delete.emit({ ...this.donut });
    }
  }
}
