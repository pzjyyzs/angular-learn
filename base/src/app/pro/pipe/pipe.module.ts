import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeComponent } from './pipe.component';
import { FileSizePipe } from './filesize.pipe';



@NgModule({
  declarations: [PipeComponent, FileSizePipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
