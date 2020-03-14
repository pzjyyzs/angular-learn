import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter, ViewChild, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Song } from 'src/app/service/data-types/common.types';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';
import { findIndex } from 'src/utils/array';
import { timer } from 'rxjs';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-wi-player-panel',
  templateUrl: './wi-player-panel.component.html',
  styleUrls: ['./wi-player-panel.component.less']
})
export class WiPlayerPanelComponent implements OnInit, OnChanges {

  @Input() songList: Song[];
  @Input() currentSong: Song;
  currentIndex: number;
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onChangeSong = new EventEmitter<Song>();

  scrollY = 0;
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;
  constructor(private songServe: SongService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.songList) {
      this.currentIndex = 0;
    }
    if (changes.currentSong) {
      if (this.currentSong) {
        this.currentIndex = findIndex(this.songList, this.currentSong);
        this.updateLyric();
        if (this.show) {
          this.scrollToCurrent();
        }
      } else {

      }
    }
    if (changes.show) {
      if (!changes.show.firstChange && this.show) {
        this.wyScroll.first.refreshScroll();
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollToCurrent(0);
          }
        });
      }
    }
  }

  private scrollToCurrent(speed = 300) {
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li');
    if (songListRefs.length) {
      const currentLi = songListRefs[this.currentIndex || 0] as HTMLElement;
      const offsetTop = currentLi.offsetTop;
      const offsetHeight = currentLi.offsetHeight;
      if (((offsetTop - Math.abs(this.scrollY)) > offsetHeight * 5) && (offsetTop < Math.abs(this.scrollY))) {
        this.wyScroll.first.scrollToElement(currentLi, speed, false, false);
      }
    }
  }
  private updateLyric() {
    this.songServe.getLyric(this.currentSong.id).subscribe(res => {

    });
  }
}
