import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-branch',
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input
          type="text"
          placeholder="Branch ID"
          formControlName="branch">
          <div class="error" *ngIf="required('branch')">
            branch ID is required
          </div>
          <div class="error" *ngIf="invalidrequired('branch')">Invalid branch code: 1 letter, 3 numbers</div>
        <input
          type="text"
          placeholder="Manager Code"
          formControlName="code">
          <div class="error" *ngIf="parent.get('store.code').hasError('required') && parent.get('store.code').touched">
            Manager ID is required
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./stock-branch.component.less']
})
export class StockBranchComponent implements OnInit {

  get invalid() {
    return (
      this.parent.get('store.branch')?.hasError('invalidBranch') &&
      this.parent.get('store.branch')?.dirty &&
      this.required('branch')
    );
  }
  @Input() parent!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  required(name: string) {
    return (
      this.parent.get(`store.${name}`)!.hasError('required') && this.parent.get(`store.${name}`)!.touched
    )
  }
}
