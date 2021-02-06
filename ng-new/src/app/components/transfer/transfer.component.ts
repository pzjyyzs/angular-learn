import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Direction, TransferItem } from './types';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit, OnChanges {

  @Input() sourceData: TransferItem[];
  @Input() search = false;
  leftDatas: TransferItem[];
  rightDatas: TransferItem[];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { sourceData }  = changes;
    if (sourceData && sourceData.currentValue) {
      sourceData.currentValue.forEach(element => {
        if (!element.direction || element.direction === 'left') {
          element.direction = 'left';
          this.leftDatas.push(element);
        } else {
          element.direction = 'right';
          this.rightDatas.push(element);
        }
      });
    }
  }

  disableBtn(direction: Direction) {
    const targetDatas = direction === 'left' ? this.rightDatas : this.leftDatas;
    return targetDatas.findIndex(item => item.checked) === -1;
  }

  onSelect(index: number, direction: Direction) {
    this[direction + 'Datas'][index].checked = !this[direction + 'Datas'][index].checked;
    this[direction + 'Datas'] =  this[direction + 'Datas'].slice();
  }

  to(direction: Direction) {
    if (direction === 'left') {
      this.move('rightDatas', 'leftDatas');
    } else {
      this.move('leftDatas', 'rightDatas');
    }
  }

  private move(
    from: 'leftDatas' | 'rightDatas',
    to: 'leftDatas' | 'rightDatas',
  ) {
    const moveList: TransferItem[] = cloneDeep(this[from])
    .filter(item => item.checked)
    .map(item => {
      item.checked = false;
      return item;
    });
    this[to] = this[to].concat(moveList);
    this[from] = this[from].filter(item => !item.checked);
  }
}
