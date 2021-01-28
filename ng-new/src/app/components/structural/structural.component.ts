import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structural',
  templateUrl: './structural.component.html',
  styleUrls: ['./structural.component.scss']
})
export class StructuralComponent implements OnInit {

  show: boolean = false;
  fruit: string = 'apple';
  showUnless: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
