import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donut } from '../models/donut';

@Injectable({
  providedIn: 'root'
})
export class DonutService {

  donuts: Donut[] = [

  ]
  constructor(private http: HttpClient) { }

  read() {
    return this.http.get<Donut[]>(`/api/donuts`);
  }

  readOne(id: string) {
    const donut = this.donuts.find((donut: Donut) => donut.id === id);
    return donut || { name: '', icon: '', price: 0, description: '' };
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
