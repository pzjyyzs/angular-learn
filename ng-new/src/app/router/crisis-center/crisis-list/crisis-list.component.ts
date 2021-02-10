import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/configs/types';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styles: [
    `
          .list-group {
              width: 320px;
              cursor: pointer;
          }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrisisListComponent implements OnInit {
  crises$: Observable<Crisis[]>;
  selectedId: number;
  constructor(private crisisServe: CrisisService) { }

  ngOnInit(): void {
    this.crises$ = this.crisisServe.getCrises();
  }

  onSelect(id: number) {
    this.selectedId = id;
  }
}
