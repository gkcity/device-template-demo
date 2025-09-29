import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {Action, Event, Property, Service} from 'xiot-core-spec-ts';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CreatePropertyComponent} from '../../../../common/dialog/create/property/create.property.component';
import {CreateActionComponent} from '../../../../common/dialog/create/action/create.action.component';
import {CreateEventComponent} from '../../../../common/dialog/create/event/create.event.component';
import {
  NzDropDownADirective,
  NzDropdownButtonDirective,
  NzDropDownDirective,
  NzDropdownMenuComponent
} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'editor-service-menu',
  templateUrl: './editor.service.menu.component.html',
  styleUrls: ['./editor.service.menu.component.less'],
  standalone: true,
  imports: [
    NzButtonComponent,
    NzTagComponent,
    NzMenuModule,
    NzCardModule,
    NzSpaceModule,
    NzIconModule,
    NzDropDownADirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzDropdownButtonDirective
  ],
  providers: [
    NzModalService
  ],
})
export class EditorServiceMenuComponent {

  @Input() version: boolean = false;
  @Input() service!: Service;
  @Input() language: string = 'zh-CN';
  @Output() titleSelected = new EventEmitter<Service>();
  @Output() propertySelected = new EventEmitter<Property>();
  @Output() actionSelected = new EventEmitter<Action>();
  @Output() eventSelected = new EventEmitter<Event>();

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private msg: NzMessageService
  ) {
  }

  onClickTitle(service: Service) {
    this.titleSelected.emit(service);
  }

  onClickProperty(p: Property) {
    this.propertySelected.emit(p);
  }

  onClickAction(a: Action) {
    this.actionSelected.emit(a);
  }

  onClickEvent(e: Event) {
    this.eventSelected.emit(e);
  }

  onAddProperty() {
    const modal = this.modal.create<CreatePropertyComponent, string, Property>({
      nzTitle: '创建一个新属性',
      nzWidth: 1000,
      nzContent: CreatePropertyComponent,
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

  onAddAction() {
    const modal = this.modal.create<CreateActionComponent, string, Property>({
      nzTitle: '创建一个新方法',
      nzWidth: 1000,
      nzContent: CreateActionComponent,
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

  onAddEvent() {
    const modal = this.modal.create<CreateEventComponent, string, Property>({
      nzTitle: '创建一个新事件',
      nzWidth: 1000,
      nzContent: CreateEventComponent,
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
