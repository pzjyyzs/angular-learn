import { Inject, Injectable } from "@angular/core";
import { SongSheet } from 'src/app/service/data-types/common.types';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SheetService } from 'src/app/service/sheet.service';

@Injectable()
export class SheetInfoResolverService implements Resolve<SongSheet> {
  constructor(private sheetServe: SheetService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<SongSheet> {
    return this.sheetServe.getSongSheetDetail(Number(route.paramMap.get('id')));
  }
}
