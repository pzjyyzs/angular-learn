import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { Donut } from '../models/donut';

@Injectable({
  providedIn: 'root'
})
export class DonutService {

  donuts: Donut[] = [

  ]
  constructor(private http: HttpClient) { }

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }
    return this.http.get<Donut[]>(`/api/donuts`).pipe(
      tap((donuts: Donut[]) => {
        this.donuts = donuts;
      })
    );
  }

  readOne(id: string) {
    return this.read().pipe(
      map((donuts: Donut[]) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);
        if (donut) {
          return donut
        }
        return { name: '', icon: '', price: 0, description: '' }
      })
    )
  }

  create(payLoad: Donut) {
    this.donuts = [...this.donuts, payLoad];
  }

  update(payload: Donut) {
    this.donuts = this.donuts.map((donut: Donut) => {
      if (donut.id === payload.id) {
        return payload;
      }
      return donut
    })
  }

  delete(payload: Donut) {
    this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);

  }
}
