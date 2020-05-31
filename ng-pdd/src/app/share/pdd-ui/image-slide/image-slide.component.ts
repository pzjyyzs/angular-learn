import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.less']
})
export class ImageSlideComponent implements OnInit,AfterViewInit {

  @Input() sliders: ImageSlider[] = [];
  @Input() scrollHeight = '160px';
  @Input() intervalBySeconds = 2;
  @ViewChild('imageSlider', { static: true }) imgSlider: ElementRef;
  @ViewChildren('img') img: QueryList<ElementRef>;

  selectedIndex = 0;
  constructor(private rd2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.rd2.setProperty(
        this.imgSlider.nativeElement,
        'scrollLeft',
        (this.getIndex(++this.selectedIndex) * this.imgSlider.nativeElement.scrollWidth) / this.sliders.length
      );
    }, this.intervalBySeconds * 1000);
    this.img.forEach(item => {
      this.rd2.setStyle(item.nativeElement, 'height', '100px');
    });
  }

  getIndex(idx: number) {
    return idx >= 0 ? idx % this.sliders.length : this.sliders.length - (Math.abs(idx) % this.sliders.length);
  }

  handleScroll(event) {
    let ratio = (event.target.scrollLeft * this.sliders.length) / event.target.scrollWidth;
    this.selectedIndex = Math.round(ratio);
  }
}
