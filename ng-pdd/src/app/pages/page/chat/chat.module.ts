import { NgModule } from '@angular/core';
import { ChatRoutingModule } from './chat-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { ChatComponent } from './component/chat/chat.component';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    ShareModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
