import { ChangeDetectionStrategy, Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import BScroll, { MouseWheel, ScrollBar } from 'better-scroll';
import { timer } from 'rxjs';

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

@Component({
  selector: 'app-wy-scroll',
  template: `
    <div class="wy-scroll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `.wy-scroll{width: 100%;height: 100%; overflow: hidden;}`
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyScrollComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data: any[];
  @Input() refreshDelay = 50;
  private bs: BScroll;

  @Output() private onScrollEnd = new EventEmitter<number>();

  @ViewChild('wrap', { static: true }) private wrapRef: ElementRef;

  constructor(readonly el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        interactive: true
      },
      mouseWheel: {}
    });
    console.log('test', this.bs)
    this.bs.on('scrollEnd', (x: { y: number }) => this.onScrollEnd.emit(x.y));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.refreshScroll();
    }
  }

  refreshScroll() {
    timer(this.refreshDelay).subscribe(() => {
      this.refresh();
    })
  }

  private refresh() {
    this.bs.refresh();
    console.log('test', this.bs)
  }
}
