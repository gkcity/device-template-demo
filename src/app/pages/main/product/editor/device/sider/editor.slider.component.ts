import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewContainerRef} from '@angular/core';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzListModule} from 'ng-zorro-antd/list';
import {EditorServiceWaterfallComponent} from './service/waterfall/editor.service.waterfall.component';
import {DeviceInstance, Service} from 'xiot-core-spec-ts';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EditorServiceGroupComponent} from './group/editor.service.group.component';
import {EditorServiceSplitComponent} from './service/split/editor.service.split.component';

@Component({
  selector: 'editor-slider',
  templateUrl: './editor.slider.component.html',
  styleUrls: ['./editor.slider.component.less'],
  standalone: true,
  imports: [
    NzMenuModule,
    NzLayoutModule,
    NzListModule,
    EditorServiceWaterfallComponent,
    EditorServiceGroupComponent,
    EditorServiceSplitComponent,
  ],
  providers: [
    NzModalService
  ],
})
export class EditorSliderComponent implements OnChanges {

  @Input() version: boolean = false;
  @Input() expert: boolean = false;
  @Input() device: DeviceInstance | undefined = undefined;
  @Input() language: string = 'zh-CN';
  @Output() changed = new EventEmitter<DeviceInstance>();
  @Output() removed = new EventEmitter<Service>();

  service: Service | undefined = undefined;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private msg: NzMessageService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['device']) {
      if (this.service) {
        this.service = this.device?.services.get(this.service.iid);
      } else {
        this.service = undefined;
      }
    }
  }

  onServiceSelected(s: Service) {
    this.service = s;
  }

  onChanged(service: Service) {
    this.changed.emit(this.device);
  }

  onRemoved($event: Service) {
    this.service = undefined;
    this.removed.emit($event);
  }
}
