import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {Property, Service} from '@jd/xiot-core-spec-ts';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PropertiesControllerComponent} from '../../../common/tables/properties/properties.component';
import {ActionsControllerComponent} from '../../../common/tables/actions/actions.component';
import {EventsControllerComponent} from '../../../common/tables/events/events.component';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ConfirmComponent} from '../../../common/dialog/confirm/confirm.component';
import {EditStringComponent} from '../../../common/dialog/edit/string/edit.string.component';
import {EditableString} from '../../../common/dialog/edit/string/EditableString';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzTableModule} from 'ng-zorro-antd/table';
import {EditorServiceHeaderComponent} from './header/editor.service.header.component';

@Component({
  selector: 'editor-service-waterfall',
  templateUrl: './editor.service.waterfall.component.html',
  styleUrls: ['./editor.service.waterfall.component.less'],
  standalone: true,
  imports: [
    NzTabsModule,
    PropertiesControllerComponent,
    ActionsControllerComponent,
    EventsControllerComponent,
    NzRowDirective,
    NzColDirective,
    NzCardModule,
    NzDescriptionsModule,
    NzSpaceModule,
    NzTagModule,
    NzTableModule,
    EditorServiceHeaderComponent,
  ],
  providers: [
    NzModalService
  ],
})
export class EditorServiceWaterfallComponent {

  @Input() version: boolean = false;
  @Input() service!: Service;
  @Input() language: string = 'zh-CN';
  @Output() changed = new EventEmitter<Service>();
  @Output() removed = new EventEmitter<Service>();

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    public msg: NzMessageService
  ) {
  }

  onServiceRemoved(service: Service) {
    const modal = this.modal.create<ConfirmComponent, string, string>({
      nzTitle: '您真的要删除这个功能组吗？',
      nzContent: ConfirmComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: service.description.get(this.language),
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
        this.removed.emit(service);
      }
    });
  }

  onEditIID(service: Service) {

  }

  onEditCode(service: Service) {
    const modal = this.modal.create<EditStringComponent, EditableString, string>({
      nzTitle: '修改功能组代码',
      nzContent: EditStringComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: new EditableString(service.type.name),
      nzFooter: [
        {
          label: '取消',
          onClick: component => component!.cancel()
        },
        {
          label: '修改',
          danger: true,
          type: 'primary',
          disabled: component => component!.disabled || false,
          onClick: component => component!.ok()
        }
      ],
      nzDraggable: true,
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        service.type.name = result;
        this.changed.emit(service);
      }
    });
  }

  onEditDescription(service: Service) {
    const modal = this.modal.create<EditStringComponent, EditableString, string>({
      nzTitle: '修改功能组描述',
      nzContent: EditStringComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: new EditableString(service.description.get(this.language)),
      nzFooter: [
        {
          label: '取消',
          onClick: component => component!.cancel()
        },
        {
          label: '修改',
          danger: true,
          type: 'primary',
          disabled: component => component!.disabled || false,
          onClick: component => component!.ok()
        }
      ],
      nzDraggable: true,
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        service.description.set(this.language, result);
        this.changed.emit(service);
      }
    });
  }

  onPropertyChanged(property: Property) {
    this.changed.emit(this.service);
  }

  onPropertyRemoved(property: Property) {
    this.service.properties.delete(property.iid);
    this.changed.emit(this.service);
  }

  onEdit(service: Service) {

  }
}
