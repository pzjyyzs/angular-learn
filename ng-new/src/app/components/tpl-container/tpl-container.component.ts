import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-tpl-container',
  templateUrl: './tpl-container.component.html',
  styleUrls: ['./tpl-container.component.scss']
})
export class TplContainerComponent implements OnInit, AfterViewInit {

  // ViewChild获取模板中的元素(组件、ng-template、dom)
  @ViewChild('firstTpl', { read: TemplateRef }) readonly firstTpl: TemplateRef<any>;
  @ViewChild('secondTpl', { read: TemplateRef }) readonly secondTpl: TemplateRef<any>;
  @ViewChild('thirdTpl', { read: TemplateRef }) readonly thirdTpl: TemplateRef<any>;
  @ViewChild('fourthTpl', { read: TemplateRef }) readonly fourthTpl: TemplateRef<any>;
  @ViewChild('freeTpl', { read: TemplateRef }) readonly freeTpl: TemplateRef<any>;
  @ViewChild('box') readonly boxEl: ElementRef;
  @ViewChild('firstContainer', { read: ViewContainerRef }) readonly firstContain: ViewContainerRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    /* const viewRef = this.firstTpl.createEmbeddedView(null); */
    /* this.boxEl.nativeElement.appendChild(viewRef.rootNodes[0]); */
    this.firstContain.createEmbeddedView(this.firstTpl);
  }

  insert(tpl: TemplateRef<any>) {
    this.firstContain.insert(tpl.createEmbeddedView(null));
  }

  insertAll() {
    [this.secondTpl, this.thirdTpl, this.fourthTpl].forEach(tpl => {
      this.firstContain.insert(tpl.createEmbeddedView(null));
    });
  }

  getOne() {
    console.log(this.firstContain.get(0));
  }
}
