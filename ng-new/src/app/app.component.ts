import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TransferItem } from './components/transfer/types';
import { switchMap } from 'rxjs/internal/operators';
import { UserService } from './services/user.service';
import { AuthKey } from './configs/contsant';
import { AccountService } from 'src/app/services/account.service';
import { EMPTY } from 'rxjs';

// selector 普通html选择器 选中app-root的标签
// templateUrl 组件的模板
// styleUrls 样式的文件
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ng-new';
  url: string = '';
  conspan: number = 2;
  isAbled: boolean = false;
  customTitle: string = 'title';
  btnCls = 'btn btnprimary';
  btnCls2 = ['btn', 'btn-info'];
  btnCls3: any = { btn: true, 'btn-info': false };
  styleExpr = 'color: red; border: 1px solid';
  styleExpr2 = ['color', 'blue', 'border', '1px solid']; // 有问题 不能用
  styleExpr3 = { color: '#BF3349', backgroundfColor: '#E0FF95' }; // 'background-color' 也可以
  width: string = '1px';
  width2: number = 1;
  list: TransferItem[] = [];
  constructor(private router: Router, private userServe: UserService, private accountServe: AccountService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      switchMap(() => this.userServe.user$),
      switchMap(user => {
        if (!user) {
          return this.accountServe.account();
        }
        return EMPTY;
      })
    ).subscribe(({ user, token }) => {
      localStorage.setItem(AuthKey, token);
      this.userServe.setUser(user);
    });
  }

  private setList() {
    this.list = [];
    const prefix = 'item' + Date.now().toString().slice(-3);
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: prefix + '_' + i,
        value: `${prefix}${i + 1}`,
        checked: i % 6 === 0
      });
    }
  }

  onChanged($event) {
    console.log($event);
  }

  toCrisi() {
    // this.router.navigateByUrl('/crisi');
    this.router.navigate(['/crisi']);
  }

  toHeroes() {
    // this.router.navigateByUrl('/heroes');
    this.router.navigate(['/heroes']);
  }
}
