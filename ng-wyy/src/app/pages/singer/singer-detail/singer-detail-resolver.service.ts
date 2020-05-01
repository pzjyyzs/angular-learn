import { Injectable } from "@angular/core";
import { Song, Lyric, SingerDetail, Singer } from 'src/app/service/data-types/common.types';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SingerService } from 'src/app/service/singer.service';
import { first } from 'rxjs/internal/operators';


type SingerDetailDataModel = [SingerDetail, Singer[]];
@Injectable()
export class SingerResolverService implements Resolve<SingerDetailDataModel> {
  constructor(private singerServe: SingerService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<SingerDetailDataModel> {
    const id = route.paramMap.get('id');
    return forkJoin([
      this.singerServe.getSingerDetail(id),
      this.singerServe.getSimiSinger(id)
    ]).pipe(first());
  }
}
