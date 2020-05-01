import { Resolve } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { SingerService } from 'src/app/service/singer.service';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/service/data-types/common.types';
import { first } from 'rxjs/internal/operators';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]]
@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService
  ) { }
  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeServe.getBanners(),
      this.homeServe.getHotTags(),
      this.homeServe.getPerosonalSheetList(),
      this.singerServe.getEnterSinger()
    ]).pipe(first());
  }
}
