import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { SearchResult, SongSheet } from './service/data-types/common.types';
import { isEmptyObject } from 'src/utils/tools';
import { ModalTypes } from './reducers/member.reducer';
import { AppStoreModule } from './store';
import { Store, select } from '@ngrx/store';
import { SetModalType, SetUserId, SetModalVisible } from './actions/member.action';
import { BatchActionsService } from './store/batch-actions.service';
import { LoginParams } from './share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { MemberService, LikeSongParams } from './service/member.service';
import { User } from './service/data-types/member.types';
import { NzMessageService } from 'ng-zorro-antd';
import { codeJson } from 'src/utils/base64';
import { StorageService } from './service/storage.service';
import { getMember, getLikeId, getModalType, getModalVisible } from './selectors/member.selectors';

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
  mySheets: SongSheet[];
  likeId: string;
  visible = false;
  currentModalType = ModalTypes.Default;
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
      this.store$.dispatch(SetUserId({ id: userId }));
      this.memberServe.getUserDetail(userId).subscribe(user => this.user = user);
    }

    const wyRememberLogin =  this.storageServe.getStorage('wyUserId');
    if (wyRememberLogin) {
      this.wyRememberLogin = JSON.parse(wyRememberLogin);
    }
    this.listenStates();
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

      this.store$.dispatch(SetUserId({ id: user.profile.userId.toString() }));
      if (params.remember) {
        this.storageServe.setStorage({
          key: 'wyRememberLogin',
          value: JSON.stringify(codeJson(params))
        });
      } else {
       this.storageServe.removeStorage('wyRememberLogin');
      }
    }, error => {
      this.alertMessage('error', error.message || '登陆失败');
    });
  }

  onLogout() {
    this.memberServe.logout().subscribe(res => {
      this.user = null;
      this.alertMessage('success', '已退出');
      this.storageServe.removeStorage('wyUserId');
      this.store$.dispatch(SetUserId({ id: ''}));
    }, error => {
      this.alertMessage('error', error.message || '退出失败');
    });
  }

  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }

  onLoadMySheets() {
    if (this.user) {
      this.memberServe.getUserSheets(this.user.profile.userId.toString()).subscribe(userSheet => {
        this.mySheets = userSheet.self;
        this.store$.dispatch(SetModalVisible({ modalVisible: true }));
      })
    } else {
      this.openModal(ModalTypes.Default);
    }
  }

  private listenStates() {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getLikeId)).subscribe(id => this.watchId(id));
    appStore$.pipe(select(getModalVisible)).subscribe(visib => this.watchModalVisible(visib));
    appStore$.pipe(select(getModalType)).subscribe(type => this.watchModalType(type));
  }

  private watchId(id: string) {
    if (id) {
      this.likeId = id;
    }
  }

  private watchModalVisible(visib: boolean) {
    if (this.visible !== visib) {
      this.visible = visib;
    }
  }

  private watchModalType(type: ModalTypes) {
    if (this.currentModalType !== type) {
      if (type === ModalTypes.Like) {
        this.onLoadMySheets();
      }
      this.currentModalType = type;
    }
  }

  onLikeSong(args: LikeSongParams) {
    this.memberServe.likeSong(args).subscribe(() => {
      this.batchActionsServe.controlModal(false);
      this.alertMessage('success', '收藏成功');
    }, error => {
      this.alertMessage('error', error.msg || '收藏失败');
    });
  }

  onCreateSheet(sheetName: string) {
    this.memberServe.createSheet(sheetName).subscribe(pid => {
      this.onLikeSong({ pid, tracks: this.likeId });
    }, error => {
      this.alertMessage('error', error.msg || '新建失败');
    })
  }
}
