import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { SearchResult } from './service/data-types/common.types';
import { isEmptyObject } from 'src/utils/tools';
import { ModalTypes } from './reducers/member.reducer';
import { AppStoreModule } from './store';
import { Store } from '@ngrx/store';
import { SetModalType } from './actions/member.action';
import { BatchActionsService } from './store/batch-actions.service';
import { LoginParams } from './share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { MemberService } from './service/member.service';
import { User } from './service/data-types/member.types';
import { NzMessageService } from 'ng-zorro-antd';
import { codeJson } from 'src/utils/base64';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-wyy';
  menu = [{
    label: '发现',
    path: '/home'
  }, {
    label: '歌单',
    path: '/sheet'
  }];


  searchResult: SearchResult;
  user: User;
  wyRememberLogin: LoginParams;
  constructor(
    private searchServe: SearchService,
    private store$: Store<AppStoreModule>,
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService,
    private messageServe: NzMessageService,
    private storageServe: StorageService
  ) {
    const userId = this.storageServe.getStorage('wyUserId');
    if (userId) {
      this.memberServe.getUserDetail(userId).subscribe(user => this.user = user);
    }

    const wyRememberLogin =  this.storageServe.getStorage('wyUserId');
    if (wyRememberLogin) {
      this.wyRememberLogin = JSON.parse(wyRememberLogin);
    }
  }
  onSearch(keyword: string) {
    if (keyword) {
      this.searchServe.search(keyword).subscribe(res => {
        this.searchResult = this.highlightKeyWord(keyword, res);
      })
    } else {
      this.searchResult = {};
    }
  }

  private highlightKeyWord(keywords: string, result: SearchResult): SearchResult {
    if (!isEmptyObject(result)) {
      const reg = new RegExp(keywords, 'ig');
      ['artists', 'playlists', 'songs'].forEach(type => {
        if (result[type]) {
          result[type].forEach(item => {
            item.name = item.name.replace(reg, '<span class="highlight">$&</span>')
          });
        }
      });
    }
    return result;
  }

  onChangeModalType(modalType = ModalTypes.Default) {
    this.store$.dispatch(SetModalType({ modalType }));
  }

  openModal(type: ModalTypes) {
    this.batchActionsServe.controlModal(true, type);
  }

  onLogin(params: LoginParams) {
    this.memberServe.login(params).subscribe(user => {
      this.user = user;
      this.batchActionsServe.controlModal(false);
      this.alertMessage('success', '登陆成功');
      this.storageServe.setStorage({
        key: 'wyUserId',
        value: user.profile.userId
      });

      if (params.remember) {
        this.storageServe.setStorage({
          key: 'wyRememberLogin',
          value: JSON.stringify(codeJson(params))
        });
      } else {
       this.storageServe.removeStorage('wyRememberLogin');
      }
    }, ({ error }) => {
      this.alertMessage('error', error.message || '登陆失败');
    });
  }

  onLogout() {
    this.memberServe.logout().subscribe(res => {
      this.user = null;
      this.alertMessage('success', '已退出');
      this.storageServe.removeStorage('wyUserId');
    },  ({ error }) => {
      this.alertMessage('error', error.message || '退出失败');
    });
  }

  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }
}
