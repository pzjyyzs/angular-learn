import { Component, OnInit } from '@angular/core';
import { FileSizePipe } from './filesize.pipe';

interface File {
  name: string;
  size: any;
  type: string
}
@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.less'],
  providers: [
    FileSizePipe // 在组件中使用pipe
  ]
})
export class PipeComponent implements OnInit {

  files: File[] = [];
  mapped: File[] = [];
  constructor(
    private fileSizePipe: FileSizePipe
  ) { }

  ngOnInit(): void {
    this.files = [
      { name: 'logo.svg', size: 2120109, type: 'image/svg' },
      { name: 'banner.svg', size: 18029, type: 'image/jpg' },
      { name: 'background.svg', size: 1784562, type: 'image/png' },
    ]
    this.mapped = this.files.map(file => {
      return {
        name: file.name,
        type: file.type,
        size: this.fileSizePipe.transform(file.size, 'mb')
      }
    })
  }

}
