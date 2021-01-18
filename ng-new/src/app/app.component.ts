import { Component } from '@angular/core';

// selector 普通html选择器 选中app-root的标签
// templateUrl 组件的模板
// styleUrls 样式的文件
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-new';
}
