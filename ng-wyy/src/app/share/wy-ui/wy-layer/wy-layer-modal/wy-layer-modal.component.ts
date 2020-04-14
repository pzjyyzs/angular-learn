import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppStoreModule } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { getMember, getModalType, getModalVisible } from 'src/app/selectors/member.selectors';

@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerModalComponent implements OnInit {

  constructor(
    private store$: Store<AppStoreModule>
  ) {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getModalVisible)).subscribe(visib => {

    });
    appStore$.pipe(select(getModalType)).subscribe(type => {

    });
   }

  ngOnInit() {
  }

}
