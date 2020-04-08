import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit, AfterViewInit {

  @Input() customView: TemplateRef<any>;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearch = new EventEmitter<string>();
  @ViewChild('nzInput', { static: false }) private nzInput: ElementRef;
  constructor() { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(this.nzInput.nativeElement, 'input')
    .pipe(debounceTime(300), distinctUntilChanged(), pluck('target', 'value'))
    .subscribe((value: string) => {
      this.onSearch.emit(value)
    });
  }
}
