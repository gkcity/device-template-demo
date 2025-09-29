import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceController} from "@jd/xiot-core-spec-ts";
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {ActionsControllerComponent} from '../common/tables/actions/actions.component';
import {EventsControllerComponent} from '../common/tables/events/events.component';
import {PropertiesControllerComponent} from '../common/tables/properties/properties.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {DeviceInstance} from '@jd/xiot-core-spec-ts/dist/xiot/core/spec/typedef/instance/DeviceInstance';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {Service} from '@jd/xiot-core-spec-ts/dist/xiot/core/spec/typedef/instance/Service';

@Component({
  selector: 'editor-tabs',
  templateUrl: './editor.tabs.component.html',
  styleUrls: ['./editor.tabs.component.less'],
  standalone: true,
  imports: [
    NzMenuModule,
    NzLayoutModule,
    NzListModule,
    NzTagComponent,
    NzCardModule,
    NzTabsModule,
    ActionsControllerComponent,
    EventsControllerComponent,
    PropertiesControllerComponent,
    NzButtonComponent,
    NzWaveDirective,
    NzButtonModule
  ],
  providers: [
  ],
})
export class EditorTabsComponent implements OnInit {

  @Input() version: boolean = false;
  @Input() device: DeviceInstance | undefined = undefined;
  @Input() language: string = 'zh-CN';
  @Input() style: number = 0;
  @Output() changed = new EventEmitter<DeviceInstance>();

  selectedIndex: number = 0;
  services: Service[] = [];

  ngOnInit(): void {
    this.services = this.device?.getServices() || [];
  }
}
