import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {
  array = [1, 2, 3, 4];
  constructor() { }

  ngOnInit(): void {
  }

}
