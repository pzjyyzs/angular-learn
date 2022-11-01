import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChildren, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit,
  Optional,
  Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarouselStrategy } from './strategy/carouselStrategy';
import { WyCarouselContentDirective } from './wy-carousel-content.directive';
import { Platform } from '@angular/cdk/platform';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WyCarouselComponent implements AfterContentInit, AfterViewInit, OnChanges, OnInit {

  activeIndex = 0;
  el: HTMLElement;
  slickListEl!: HTMLElement;
  slickTrackEl!: HTMLElement;
  strategy?: CarouselStrategy;

  transitionInProgress: number  | null = null;

  private isTransiting = false;
  private destroy$ = new Subject<void>();
  @ContentChildren(WyCarouselContentDirective) carouselContents!: QueryList<WyCarouselContentDirective>;

  @ViewChild('slickList', { static: true }) slickList!: ElementRef<HTMLElement>;
  @ViewChild('slickTrack', { static: true }) slickTrack!: ElementRef<HTMLElement>;

  @Input() @WithConfig() nzAutoPlay = true;
  @Output() readonly nzBeforeChange = new EventEmitter<any>();
  @Output() readonly nzAfterChange = new EventEmitter<number>();

  constructor(
    elementRef: ElementRef,
    private readonly renderer: Renderer2,
    public readonly ngZone: NgZone,
    private readonly platform: Platform,
    private readonly cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'app-wy-carousel');
    this.el = elementRef.nativeElement;
  }

  ngOnInit(): void {
    // this.slickListEl = this.slickList.nativeElement;
    this.slickTrackEl = this.slickTrack.nativeElement;

    /* this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      // this.dir = direction;
      this.markContentActive(this.activeIndex);
      this.cdr.detectChanges();
    }); */

  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzEffect, nzDotPosition } = changes;
    this.scheduleNextTransition();
  }

  ngAfterContentInit(): void {
    this.markContentActive(0);
  }

  ngAfterViewInit(): void {

    this.carouselContents.changes.subscribe(() => {
      this.markContentActive(0);
      this.layout();
    });

    this.switchStrategy();
    this.markContentActive(0);
    this.layout();
  }

  private markContentActive(index: number): void {
    this.activeIndex = index;

    if (this.carouselContents) {
      this.carouselContents.forEach((slide, i) => {
        slide.isActive = index === i;
      });
    }

    this.cdr.detectChanges();
  }

  private switchStrategy(): void{
    this.strategy = new CarouselStrategy(this, this.cdr, this.renderer, this.platform);
  }

  private scheduleNextTransition(): void {
    this.clearScheduledTransition();

    this.transitionInProgress = window.setTimeout(() => {
      this.goTo(this.activeIndex + 1);
    }, 2000);
  }

  private clearScheduledTransition(): void {
    if (this.transitionInProgress) {
      clearTimeout(this.transitionInProgress);
      this.transitionInProgress = null;
    }
  }

  goTo(index: number): void {
    if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
      const length = this.carouselContents.length;
      const from = this.activeIndex;
      const to = (index + length) % length;
      this.isTransiting = true;
      this.nzBeforeChange.emit({ from, to });
      this.strategy.switch(this.activeIndex, index).subscribe(() => {
        this.scheduleNextTransition();
        this.nzAfterChange.emit(to);
        this.isTransiting = false;
      });
      this.markContentActive(to);
      this.cdr.markForCheck();
    }
  }

  layout(): void {
    if (this.strategy) {
      this.strategy.withCarouselContents(this.carouselContents);
    }
  }
}

