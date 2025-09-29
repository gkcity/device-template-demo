import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {ServiceControllerComponent} from './service/service.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {DeviceInstance, Service} from '@jd/xiot-core-spec-ts';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'editor-waterfall',
  templateUrl: './editor.waterfall.component.html',
  styleUrls: ['./editor.waterfall.component.less'],
  standalone: true,
  imports: [
    NzMenuModule,
    NzLayoutModule,
    NzListModule,
    NzButtonModule,
    ServiceControllerComponent,
    NzRowDirective,
    NzColDirective,
  ],
  providers: [
  ],
})
export class EditorWaterfallComponent {

  @Input() version: boolean = false;
  @Input() device: DeviceInstance | undefined = undefined;
  @Input() language: string = 'zh-CN';
  @Input() style: number = 0;
  @Output() changed = new EventEmitter<DeviceInstance>();

  onChanged(service: Service) {
  }
}
