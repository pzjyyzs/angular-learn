import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit {

  playList: any;
  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.songService.getSheet(parseInt(heroId)).subscribe(data =>{
        console.log(data)
        this.playList = data.playlist;
      })

    }
  }

}
