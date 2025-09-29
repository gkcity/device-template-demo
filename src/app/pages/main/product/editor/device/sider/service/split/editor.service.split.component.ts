import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewContainerRef} from '@angular/core';
import {Action, Event, Property, Service} from '@jd/xiot-core-spec-ts';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzContentComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {EditorServiceMenuComponent} from './menu/editor.service.menu.component';
import {EditorServicePropertyComponent} from './detail/property/editor.service.property.component';
import {EditorServiceDetailComponent} from './detail/service/editor.service.detail.component';
import {EditorActionDetailComponent} from './detail/action/editor.action.detail.component';
import {EditorEventDetailComponent} from './detail/event/editor.event.detail.component';

@Component({
  selector: 'editor-service-split',
  templateUrl: './editor.service.split.component.html',
  styleUrls: ['./editor.service.split.component.less'],
  standalone: true,
  imports: [
    NzTabsModule,
    NzCardModule,
    NzDescriptionsModule,
    NzSpaceModule,
    NzTagModule,
    NzTableModule,
    NzContentComponent,
    NzLayoutComponent,
    NzSiderComponent,
    EditorServiceMenuComponent,
    EditorServicePropertyComponent,
    EditorServiceDetailComponent,
    EditorActionDetailComponent,
    EditorEventDetailComponent,
  ],
  providers: [
    NzModalService
  ],
})
export class EditorServiceSplitComponent implements OnChanges {

  @Input() version: boolean = false;
  @Input() service!: Service;
  @Input() language: string = 'zh-CN';
  @Output() changed = new EventEmitter<Service>();
  @Output() removed = new EventEmitter<Service>();

  showServiceDetail: boolean = false;
  property: Property | undefined = undefined;
  action: Action | undefined = undefined;
  event: Event | undefined = undefined;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    public msg: NzMessageService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service']) {
      this.property = undefined;
      this.action = undefined;
      this.event = undefined;
    }
  }

  onServiceRemoved(service: Service) {
    this.removed.emit(service);
  }

  onPropertyChanged(property: Property) {
    this.changed.emit(this.service);
  }

  onPropertyRemoved(property: Property) {
    this.service.properties.delete(property.iid);
    this.changed.emit(this.service);
    this.property = undefined;
  }

  onActionRemoved(action: Action) {
    this.service.actions.delete(action.iid);
    this.changed.emit(this.service);
    this.action = undefined;
  }

  onEventRemoved(event: Event) {
    this.service.events.delete(event.iid);
    this.changed.emit(this.service);
    this.event = undefined;
  }

  onTitleSelected(service: Service) {
    this.showServiceDetail = true;
    this.property = undefined;
    this.action = undefined;
    this.event = undefined;
  }

  onPropertySelected(property: Property) {
    this.showServiceDetail = false;
    this.property = property;
    this.action = undefined;
    this.event = undefined;
  }

  onActionSelected(action: Action) {
    this.showServiceDetail = false;
    this.property = undefined;
    this.action = action;
    this.event = undefined;
  }

  onEventSelected(event: Event) {
    this.showServiceDetail = false;
    this.property = undefined;
    this.action = undefined;
    this.event = event;
  }
}
