import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/service/data-types/member.types';
import { MemberService } from 'src/app/service/member.service';
import { timer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-memner-card',
  templateUrl: './memner-card.component.html',
  styleUrls: ['./memner-card.component.less']
})
export class MemnerCardComponent implements OnInit {

  point: number;
  showTip = false;
  tipTitle = '';
  @Input() user: User;
  @Output() openMOdal = new EventEmitter<void>();
  constructor(private memberServe: MemberService, private messageServe: NzMessageService) { }

  ngOnInit() {
  }

  onSignin() {
    this.memberServe.signin().subscribe(res => {
      this.alertMessage('success', '签到成功');
      this.point = res.point;
      this.showTip = true;
      this.tipTitle = '积分+' + res.point;
      timer(1500).subscribe(() => {
        this.showTip = false;
        this.tipTitle = '';
      });
    }, error => {
      this.alertMessage('error', error.msg || '签到失败');
    });
  }

  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }
}
