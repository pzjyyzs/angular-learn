import { Singer, SongSheet, Dj, Song } from './../../../services/data-types';
import { combineLatest } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from 'src/app/services/data-types';
import { HomeService } from 'src/app/services/home.service';
import { WyCarouselComponent } from '../../../share/wy-ui/wy-carousel/wy-carousel.component';
import { SongService } from 'src/app/services/song.service';
import { BatchActionService } from 'src/app/store/batch-action.service';

type Playlist  = {
  coverImgUrl: string,
  name: string,
  tracks: Song[]
}

type Toplist =  {
  playlist: Playlist
}
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.less']
})
export class RecommendComponent implements OnInit {
  banner: Banner[] = [];
  songSheet: SongSheet[] = [];
  albums?: any[] = []
  toplist?: Toplist;
  newList?: Toplist;
  hotList?: Toplist;
  _indexColor: string = "";
  isHoving: string = '';
  singerList: Singer[];
  djList: Dj[];

  @ViewChild('carousel') carousel!: WyCarouselComponent;

  get indexColor(): string {
    return this._indexColor;
  }

  set indexColor(color) {
    this._indexColor = `url(${color}?imageView&blur=40x20)`;
  }

  constructor(
    private homeService: HomeService,
    private songService: SongService,
    private batchService: BatchActionService,
  ) {
    combineLatest([this.homeService.getBanners(), this.homeService.getTopPlaylist(),this.homeService.getTopAlbum(),
      this.songService.getSheet(19723756), this.songService.getSheet(3779629), this.songService.getSheet(3778678),
      this.songService.getIndexSongList(), this.songService.getTopListDj(),
    ])
      .subscribe(data => {
        console.log('123', data)
        this.banner = data[0];
        if (this.banner.length > 0) {
          this.indexColor = this.banner[0].imageUrl;
        }

        this.songSheet = data[1];
        this.albums = this.sliceAlbums(data[2]?.albums);

        this.toplist = data[3];
        this.newList = data[4];
        this.hotList = data[5];
        this.singerList = data[6];
        this.djList = data[7];
    })
  }

  ngOnInit(): void {
  }

  beforeChange(item: {from: number, to: number}): void {
    this.indexColor = this.banner[item.to].imageUrl;
  }

  changeImage(value: string): void {
    if (value === 'prev') {
      this.carousel.pre();
    } else {
      this.carousel.next();
    }
  }

  sliceAlbums(arr: any[]) {
    let total = [];
    let index = 2;
    while(index--) {
      total.push(arr.splice(0, 5));
    }
    return total;
  }

  addClass(index: number, item: any): void {
    this.isHoving = index + item.name;
  }

  removeClass(): void {
    this.isHoving = '';
  }

  onPlay(item: Song) {
    this.songService.getSongList(item).subscribe(list => {
      if (list.length) {
        this.batchService.insertSong(list[0])
      } else {
        //this.a
      }
      console.log(list);
    })
  }
}
