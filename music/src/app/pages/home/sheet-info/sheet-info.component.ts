import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit {

  playList: any;
  user: any;
  description: { short: string, long: string} = { short: '', long: '' };
  controlDesc = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };
  constructor(private route: ActivatedRoute, private songService: SongService, private userService: UserService) { }

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.songService.getSheet(parseInt(heroId))
        .pipe(
          mergeMap(data => {
            this.playList = data.playlist;
            console.log(this.playList)
            if (this.playList.description) {
              console.log(this.playList.description.length)
              this.changeDesc(this.playList.description)
            }
            return this.userService.getUser({uid: data.playlist.userId})
          })
        ).subscribe(data => {
          console.log(data);
          this.user = data
        })
    }
  }

  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if (this.controlDesc.isExpand) {
      this.controlDesc.label = '收起';
      this.controlDesc.iconCls = 'up';
    } else {
      this.controlDesc.label = '展开';
      this.controlDesc.iconCls = 'down';
    }
  }

  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description = {
        short: this.replaceBr('<b>介绍：</b>' + desc),
        long: ''
      };
    } else {
      this.description = {
        short: this.replaceBr('<b>介绍：</b>' + desc.slice(0, 99)) + '...',
        long: this.replaceBr('<b>介绍：</b>' + desc)
      };
    }
  }

  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }
}
