import { Component, OnInit } from '@angular/core';
import { Herohero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Herohero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void { this.submitted = true; }

  newHero(): void {
    this.model = new Herohero(42, '', '');
  }
}
