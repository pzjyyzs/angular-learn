import { Injectable } from "@angular/core";
import { Song, Lyric, SingerDetail } from 'src/app/service/data-types/common.types';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SingerService } from 'src/app/service/singer.service';


type SongDataModel = [Song, Lyric];
@Injectable()
export class SingerResolverService implements Resolve<SingerDetail> {
  constructor(private singerServe: SingerService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<SingerDetail> {
    const id = route.paramMap.get('id');
    return  this.singerServe.getSingerDetail(id);
  }
}
