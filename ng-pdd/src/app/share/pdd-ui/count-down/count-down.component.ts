import { Component, OnInit, Input } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/internal/operators';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {

  @Input() startDate = new Date();
  @Input() futureDate: Date;
  private _MS_PER_SECOND = 1000;
  countDown$: Observable<string>;

  constructor() { }

  ngOnInit() {
    this.countDown$ = interval(1000).pipe(
      map(elapse => this.diffInsec(this.startDate, this.futureDate) - elapse),
      takeWhile(gap => gap >= 0),
      map(sec => ({
        day: Math.floor((sec / 3600) / 24),
        hour: Math.floor((sec / 3600) % 24),
        minute: Math.floor((sec / 60) % 60),
        second: Math.floor(sec % 60)
      })),
      map(({hour, minute, second}) => `${hour}:${minute}:${second}`)
    );
  }

  private diffInsec = (start: Date, future: Date): number => {
    const diff = future.getTime() - this.startDate.getTime();
    return Math.floor(diff / this._MS_PER_SECOND);
  }
}
