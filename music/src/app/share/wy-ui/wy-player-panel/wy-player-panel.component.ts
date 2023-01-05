import { SongService } from 'src/app/services/song.service';
import { Component, Input, OnInit, QueryList, SimpleChanges, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { Song } from 'src/app/services/data-types';
import { findIndex } from 'src/app/utils/array';
import { BaseLyricLine, WyLyric } from './wy-lyric';
import { WyScrollComponent } from '../player/wy-scroll/wy-scroll.component';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit {

  @Input() playing: boolean;
  @Input() songList: Song[];
  @Input() currentSong: Song | undefined;
  @Input() show: boolean = true;

  get picUrl() {
    if (this.currentSong) {
      return `//music.163.com/api/img/blur/${this.currentSong.al.pic_str}`
    }
    return '';
  }

  currentIndex: number;
  currentLyric: BaseLyricLine[];
  currentLineNum: number;

  private lyric: WyLyric | null;
  private lyricRefs: NodeList | null;
  private startLine = 2;

  //@ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;
  @ViewChild('listlyric') private listlyric: ElementRef<HTMLElement>;
  constructor(private songServe: SongService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playing'] && !changes['playing'].firstChange && this.lyric) {
      this.lyric.togglePlay(this.playing);
    }

    if (changes['songList'] && this.currentSong) {
      this.updateCurrentIndex();
    }

    if (changes['currentSong']) {
      if (this.currentSong) {
        this.updateCurrentIndex();
        this.updateLyric();
        if (this.show) {
          // this.
        }
      }
    }

    if (changes['show']) {
      if (!changes['show'].firstChange && this.show) {
        // this.wyScroll.first.refreshScroll();
      }
    }
  }

  private updateCurrentIndex() {
    if (this.currentSong) {
      this.currentIndex = findIndex(this.songList, this.currentSong);
    }
  }

  private updateLyric() {
    this.resetLyric();
    this.currentSong && this.songServe.getLyric(this.currentSong.id).subscribe(res => {
      this.lyric = new WyLyric(res);
      console.log('music', this.lyric, this.playing);
      this.currentLyric = this.lyric.lines;
      this.startLine = res.tlyric ? 1 : 3;
      this.handleLyric();

      if (this.playing) {
        this.lyric.play();
      }
    })
  }

  private resetLyric() {
    if (this.lyric) {
      this.lyric.stop();
      this.lyric = null;
      this.currentLyric = [];
      this.currentLineNum = 0;
      this.lyricRefs = null;
    }
  }

  private handleLyric() {
    this.lyric?.handler.subscribe(({ lineNum }) => {
      if (!this.lyricRefs) {
        this.lyricRefs = this.listlyric.nativeElement.querySelectorAll('p');
      }

      if (this.lyricRefs.length) {
        this.currentLineNum = lineNum;
        if (lineNum > this.startLine) {
          this.scrollToCurrentLyric(300);
        } else {
          this.listlyric.nativeElement.scrollTop = 0;
        }
      }
    })
  }

  private scrollToCurrentLyric(speed = 300) {
    const targetLine = this.lyricRefs && this.lyricRefs[this.currentLineNum - this.startLine];
    if (targetLine) {
      this.listlyric.nativeElement.scrollTop = this.listlyric.nativeElement.scrollTop + 32;  // 32 p height
    }
  }
}
