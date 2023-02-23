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
    return this.http.post<Donut>('/api/donuts', payLoad).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      })
    )
    this.donuts = [...this.donuts, payLoad];
  }

  update(payload: Donut) {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === donut.id) {
            return donut;
          }
          return item
        })
      })
    )

  }

  delete(payload: Donut) {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(tap(() => {

      this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);
    }));

  }
}
