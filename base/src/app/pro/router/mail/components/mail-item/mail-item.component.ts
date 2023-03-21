import { Component, Input, OnInit } from '@angular/core';
import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'app-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.less']
})
export class MailItemComponent implements OnInit {

  @Input()
  message!: Mail;
  constructor() { }

  ngOnInit(): void {
  }

}
