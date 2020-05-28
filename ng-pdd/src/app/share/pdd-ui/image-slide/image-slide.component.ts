import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.less']
})
export class ImageSlideComponent implements OnInit,AfterViewInit {

  @Input() sliders: ImageSlider[] = [];
  @ViewChild('imageSlider', { static: true }) imgSlider: ElementRef;
  @ViewChildren('img') img: QueryList<ElementRef>;
  constructor(private rd2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.img.forEach(item => {
      this.rd2.setStyle(item.nativeElement, 'height', '100px');
    })
  }
}
