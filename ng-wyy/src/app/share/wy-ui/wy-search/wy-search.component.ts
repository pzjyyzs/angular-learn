import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { fromEvent } from 'rxjs';
import { SearchResult } from 'src/app/service/data-types/common.types';
import { isEmptyObject } from 'src/utils/tools';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() customView: TemplateRef<any>;
  @Input() searchResult: SearchResult;
  @Input() connectedRef: ElementRef;
  @Output() onSearch = new EventEmitter<string>();
  @ViewChild('search', { static: false }) private defaultRef: ElementRef;
  @ViewChild('nzInput', { static: false }) private nzInput: ElementRef;

  private overlayRef: OverlayRef;
  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  onFocus() {
    if (this.searchResult && !isEmptyObject(this.searchResult)) {
      this.showOverlayPanel();
    }
  }

  ngAfterViewInit() {
    fromEvent(this.nzInput.nativeElement, 'input')
    .pipe(debounceTime(300), distinctUntilChanged(), pluck('target', 'value'))
    .subscribe((value: string) => {
      this.onSearch.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchResult && !changes.searchResult.firstChange) {
      if (!isEmptyObject(this.searchResult)) {
        this.showOverlayPanel();
      } else {
        this.showOverlayPanel();
      }
    }
  }

  hideOverlayPanel() {
    if (this.overlayRef && this.overlayRef.hasAttached) {
      this.overlayRef.dispose();
    }
  }

  showOverlayPanel() {
    this.hideOverlayPanel();
    const positionStrategy = this.overlay.position()
    .flexibleConnectedTo(this.connectedRef || this.defaultRef)
    .withPositions([{
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    }]).withLockedPosition(true);
    this.overlayRef = this.overlay.create({
      // hasBackdrop: true,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    const panelPortal = new ComponentPortal(WySearchPanelComponent, this.viewContainerRef);
    const panelRef = this.overlayRef.attach(panelPortal);
    panelRef.instance.searchResult = this.searchResult;
    this.overlayRef.backdropClick().subscribe(() => {
      this.hideOverlayPanel();
    });
  }

  onBlur() {
    this.hideOverlayPanel();
  }
}
