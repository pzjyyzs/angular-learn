import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { of, Observable, from, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, retry, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


@Injectable()
class WikeService {
  readonly url = 'https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&origin=*&search=';
  list(keyword): Observable<string[]> {
    return ajax.getJSON(this.url + keyword).pipe(map(item => item[1]));
  }
}

@Component({
  selector: 'app-exmple',
  templateUrl: './exmple.component.html',
  styleUrls: ['./exmple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WikeService]
})
export class ExmpleComponent implements OnInit, AfterViewInit {

  list: string[] = [];
  @ViewChild('input', { static: true }) private inputEl: ElementRef;
  constructor(private wike: WikeService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputEl.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        switchMap((value: string) => {
          return value.length ? this.wike.list(value) : of([]);
        }),
        retry(3)
      )
      .subscribe(data => {
        this.list = data;
        this.cdr.markForCheck();
      })
  }
}
