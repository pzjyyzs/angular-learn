import { Component, OnInit } from '@angular/core';
import { Hero, HeroArg } from 'src/app/configs/types';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  heros: Hero[] = [
    {
      id: 'hero_3861592711335647',
      name: '盖伦',
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
    },
    {
      id: 'hero_3081592487543496',
      name: '赵信',
      phone: 15356708566,
      gender: '0',
      genderText: '男',
      age: 30,
      job: '0',
      jobText: '战士',
      role: 'user',
      email: '11245767788@lol.com',
      createTime: 1592487543496,
      brief: '菊花总管'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.searchParams);
  }
}
