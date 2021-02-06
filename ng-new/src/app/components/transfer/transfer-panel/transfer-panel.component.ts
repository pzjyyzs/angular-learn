import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TransferItem } from '../types';

@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss']
})
export class TransferPanelComponent implements OnInit, OnChanges {

  @Input() list: TransferItem[] = [];
  @Input() search = false;
  @Output() selected = new EventEmitter<number>();
  showList: TransferItem[] = [];
  selecteds: TransferItem[] = [];
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { list } = changes;
    if (list) {
      this.selecteds = this.list.filter(item => item.checked);
      this.showList = list.currentValue.slice();
    }
  }

  ngOnInit(): void {

  }

  onInput(event: Event) {
    const { value } = (event.target as HTMLInputElement);
    this.showList = this.list.filter(item => item.value.includes(value));
  }

  itemClick(index: number) {
    this.selected.emit(index);
  }

  targetIndex(key: string): number {
    return this.selecteds.findIndex(item => item.key === key);
  }

  onChanged(selecteds: TransferItem[]) {

  }
}
