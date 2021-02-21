import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Hero } from '../heroes/home/add-hero/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sub = new Subject<Hero>();
  readonly user$ = this.sub.asObservable();
  constructor() { }

  setUser(user: Hero) {
    this.sub.next(user);
  }

  clearUser(): void {
    this.sub.next(null);
  }
}
