import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { SearchResult, SongSheet } from './service/data-types/common.types';
import { isEmptyObject } from 'src/utils/tools';
import { ModalTypes, ShareInfo } from './reducers/member.reducer';
import { AppStoreModule } from './store';
import { Store, select } from '@ngrx/store';
import { SetModalType, SetUserId, SetModalVisible } from './actions/member.action';
import { BatchActionsService } from './store/batch-actions.service';
import { LoginParams } from './share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { MemberService, LikeSongParams, ShareParams } from './service/member.service';
import { User } from './service/data-types/member.types';
import { NzMessageService } from 'ng-zorro-antd';
import { codeJson } from 'src/utils/base64';
import { StorageService } from './service/storage.service';
import { getMember, getLikeId, getModalType, getModalVisible, getShareInfo } from './selectors/member.selectors';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/internal/operators';
import { Observable, interval } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Title } from '@angular/platform-browser';

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

  loadPercent = 0;
  searchResult: SearchResult;
  user: User;
  wyRememberLogin: LoginParams;
  mySheets: SongSheet[];
  likeId: string;
  visible = false;
  showSpin = false;
  currentModalType = ModalTypes.Default;
  shareInfo: ShareInfo;
  routeTitle = '';
  private navEnd: Observable<NavigationEnd>;
  constructor(
    private searchServe: SearchService,
    private store$: Store<AppStoreModule>,
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService,
    private messageServe: NzMessageService,
    private storageServe: StorageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleServe: Title,
  ) {
    const userId = this.storageServe.getStorage('wyUserId');
    if (userId) {
      this.store$.dispatch(SetUserId({ id: userId }));
      this.memberServe.getUserDetail(userId).subscribe(user => this.user = user);
    }

    const wyRememberLogin = this.storageServe.getStorage('wyUserId');
    if (wyRememberLogin) {
      this.wyRememberLogin = JSON.parse(wyRememberLogin);
    }
    this.listenStates();

    this.router.events.pipe(filter(evt => evt instanceof NavigationStart)).subscribe(() => {
      this.loadPercent = 0;
      this.setTitle();
    });

    this.navEnd = this.router.events.pipe(filter(evt  => evt instanceof NavigationEnd)) as Observable<NavigationEnd>;
    this.setLoadingBar();
  }

  private setLoadingBar() {
    interval(100).pipe(takeUntil(this.navEnd)).subscribe(() => {
      this.loadPercent = Math.max(95, ++this.loadPercent);
    });
    this.navEnd.subscribe(() => {
      this.loadPercent = 100;
    });
  }

  private setTitle() {
    this.navEnd.pipe(
      map(() => this.activateRoute),
      map((route: ActivatedRoute) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.routeTitle = data.title;
      this.titleServe.setTitle(this.routeTitle);
    });
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

  openModalByMenu(type: 'loginByPhone' | 'register') {
    if (type === 'loginByPhone') {
      this.openModal(ModalTypes.LoginByPhone);
    } else {
      this.openModal(ModalTypes.Register);
    }
  }

  openModal(type: ModalTypes) {
    this.batchActionsServe.controlModal(true, type);
  }

  onLogin(params: LoginParams) {
    this.showSpin = true;
    this.memberServe.login(params).subscribe(user => {
      this.user = user;
      this.closeModal();
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
      this.showSpin = false;
    }, error => {
      this.showSpin = false;
      this.alertMessage('error', error.message || '登陆失败');
    });
  }

  onLogout() {
    this.memberServe.logout().subscribe(res => {
      this.user = null;
      this.alertMessage('success', '已退出');
      this.storageServe.removeStorage('wyUserId');
      this.store$.dispatch(SetUserId({ id: '' }));
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
    appStore$.pipe(select(getShareInfo)).subscribe(info => this.watchShareInfo(info));
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

  private watchShareInfo(info) {
    if (info) {
      if (this.user) {
        this.shareInfo = info;
        this.openModal(ModalTypes.Share);
      } else {
        this.openModal(ModalTypes.Default);
      }
    }
  }
  onLikeSong(args: LikeSongParams) {
    this.memberServe.likeSong(args).subscribe(() => {
      this.closeModal();
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

  closeModal() {
    this.batchActionsServe.controlModal(false);
  }

  onShare(arg: ShareParams) {
    this.memberServe.shareResource(arg).subscribe(() => {
      this.closeModal();
      this.alertMessage('success', '分享成功');
    }, error => {
      this.alertMessage('error', error.msg || '分享失败');
    });
  }

  onRegister(phone: string) {
    this.alertMessage('success', '注册成功');
  }
}
