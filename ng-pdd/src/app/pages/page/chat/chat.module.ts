import { NgModule } from '@angular/core';
import { ChatRoutingModule } from './chat-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
