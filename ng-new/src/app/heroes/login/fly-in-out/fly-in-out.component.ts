import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../../home/add-hero/types';
import HEROES from '../../../configs/hero';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-fly-in-out',
  templateUrl: './fly-in-out.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class FlyInOutComponent implements OnInit {

  heroes: Hero[] = HEROES;
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.heroes.push({
      id: 'hero_3861592711335649',
      name: '亚索',
      phone: 13356788776,
      gender: '0',
      genderText: '男',
      age: 30,
      job: '0',
      jobText: '战士',
      role: 'admin',
      email: '11245767788@lol.com',
      createTime: 1592711335647,
      brief: '德玛西亚之力'
    });
  }

  remove(id: string) {
    const index = this.heroes.findIndex(item => item.id === id);
    if (index > -1) {
      this.heroes.splice(index, 1);
    }
  }
}
