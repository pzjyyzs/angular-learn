import { SongService } from 'src/app/services/song.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Song } from 'src/app/services/data-types';
import { findIndex } from 'src/app/utils/array';
import { BaseLyricLine, WyLyric } from './wy-lyric';

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
  constructor(private songServe: SongService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playing']) {

    }

    if (changes['currentSong']) {
      if (this.currentSong) {
        this.updateCurrentIndex();
        this.updateLyric();
        this.songServe.getLyric(this.currentSong.id).subscribe(res => {
          console.log('music', res);
          this.lyric = new WyLyric(res);
          this.currentLyric = this.lyric.lines;
          this.startLine = res.tlyric ? 1 : 3;
        })
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
}
