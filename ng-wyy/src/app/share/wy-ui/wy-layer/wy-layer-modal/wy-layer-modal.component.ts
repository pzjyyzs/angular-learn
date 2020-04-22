import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ViewChild, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { AppStoreModule } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { getMember, getModalType, getModalVisible } from 'src/app/selectors/member.selectors';
import { ModalTypes } from 'src/app/reducers/member.reducer';
import { Overlay, OverlayRef, OverlayKeyboardDispatcher, BlockScrollStrategy } from '@angular/cdk/overlay';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { ESCAPE } from '@angular/cdk/keycodes';
import { WINDOW } from 'src/app/service/service.module';

@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerModalComponent implements OnInit, AfterViewInit {

  private visible = false;
  private currentModalType = ModalTypes.Default;
  private overlayRef: OverlayRef;
  showModal = false;
  private scrollStrategy: BlockScrollStrategy;
  private resizeHandle: () => void;
  @ViewChild('modalContainer', { static: false }) private modalRef: ElementRef;
  constructor(
    @Inject(Document) private doc: Document,
    @Inject(WINDOW) private win: Window,
    private store$: Store<AppStoreModule>,
    private overlay: Overlay,
    private elementRef: ElementRef,
    private overlayKeyboardDispatcher: OverlayKeyboardDispatcher,
    private cdr: ChangeDetectorRef,
    private batchActionsServe: BatchActionsService,
    private rd: Renderer2
  ) {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getModalVisible)).subscribe(visib => {
      this.watchModalVisible(visib);
    });
    appStore$.pipe(select(getModalType)).subscribe(type => {
      this.watchModalType(type);
    });
    this.scrollStrategy = this.overlay.scrollStrategies.block();
  }

  ngOnInit() {
    this.createOverlay();
  }

  ngAfterViewInit() {
    this.listenResizeToCenter();
  }

  private listenResizeToCenter() {
    const modal = this.modalRef.nativeElement;
    const modalSize = this.getHideDomSize(modal);
    this.keepCenter(modal, modalSize);
    this.resizeHandle = this.rd.listen('window', 'resize', () => {
      this.keepCenter(modal, modalSize);
    });
  }
  private getHideDomSize(dom: HTMLElement) {
    return {
      w: dom.offsetWidth,
      h: dom.offsetWidth
    }
  }

  private getWindowSize() {
    return {
      w: this.win.innerWidth || this.doc.documentElement.clientWidth ||  this.doc.body.offsetWidth,
      h: this.win.innerHeight ||  this.doc.documentElement.clientHeight ||  this.doc.body.offsetHeight
    }
  }

  private keepCenter(modal: HTMLElement, size: { w: number, h: number }) {
    const left = (this.getWindowSize().w - size.w) / 2;
    const top = (this.getWindowSize().h - size.h) / 2;
    modal.style.left = left + 'px';
    modal.style.top = top + 'px';

  }

  private createOverlay() {
    this.overlayRef = this.overlay.create();
    this.overlayRef.overlayElement.appendChild(this.elementRef.nativeElement);
    this.overlayRef.keydownEvents().subscribe(e => this.keydownListenert(e));
  }

  private keydownListenert(evt: KeyboardEvent) {
    if (evt.keyCode === ESCAPE) {
      this.hide();
    }
  }

  private watchModalVisible(visib: boolean) {
    if (this.visible !== visib) {
      this.visible = visib;
      this.handleVisibleChange(visib);
    }

  }

  private watchModalType(type: ModalTypes) {
    if (this.currentModalType !== type) {
      this.currentModalType = type;
    }
  }

  private handleVisibleChange(visib: boolean) {
    this.showModal = visib;
    if (visib) {
      this.scrollStrategy.enable();
      this.overlayKeyboardDispatcher.add(this.overlayRef);
      this.listenResizeToCenter();
    } else {
      this.scrollStrategy.disable();
      this.overlayKeyboardDispatcher.remove(this.overlayRef);
      this.resizeHandle();
    }
    this.cdr.markForCheck();
  }

  private dissmissOverlay() {

  }

  hide() {
    this.batchActionsServe.controlModal(false);
  }
}
