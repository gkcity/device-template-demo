import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {DeviceInstance, Service} from '@jd/xiot-core-spec-ts';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CreateServiceComponent} from '../../common/dialog/create/service/create.service.component';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'editor-service-group',
  templateUrl: './editor.service.group.component.html',
  styleUrls: ['./editor.service.group.component.less'],
  standalone: true,
  imports: [
    NzButtonComponent,
    NzTagComponent,
    NzMenuModule,
    NzCardModule,
    NzSpaceModule,
    NzIconModule,
    NzDropDownModule
  ],
  providers: [
    NzModalService
  ],
})
export class EditorServiceGroupComponent {

  @Input() version: boolean = false;
  @Input() device: DeviceInstance | undefined = undefined;
  @Input() language: string = 'zh-CN';
  @Output() selected = new EventEmitter<Service>();

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private msg: NzMessageService
  ) {
  }

  onClickService(s: Service) {
    this.selected.emit(s);
  }

  onAddService() {
    const modal = this.modal.create<CreateServiceComponent, string, Service>({
      nzTitle: '创建一个新功能组',
      nzWidth: 1000,
      nzContent: CreateServiceComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: this.language,
      nzFooter: [
        {
          label: '取消',
          onClick: component => component!.cancel()
        },
        {
          label: '确认',
          danger: true,
          type: 'primary',
          onClick: component => component!.ok()
        }
      ],
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        // todo
      }
    });
  }
}
