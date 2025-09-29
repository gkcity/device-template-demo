import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '@jd/xiot-core-spec-ts';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {PropertiesControllerComponent} from "../../common/tables/properties/properties.component";
import {ActionsControllerComponent} from '../../common/tables/actions/actions.component';
import {EventsControllerComponent} from '../../common/tables/events/events.component';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {DeviceInstance} from '@jd/xiot-core-spec-ts/dist/xiot/core/spec/typedef/instance/DeviceInstance';

@Component({
  selector: 'debugger-service-controller',
  templateUrl: './service.component.html',
  standalone: true,
  imports: [
    NzCardComponent,
    NzTagComponent,
    PropertiesControllerComponent,
    ActionsControllerComponent,
    EventsControllerComponent,
    NzIconDirective,
    NzDividerComponent,
    NzRowDirective,
    NzColDirective,
    NzButtonComponent
  ],
})
export class ServiceControllerComponent {

  @Input() service!: Service;
  @Output() changed = new EventEmitter<Service>();

  expand: boolean = false;

  constructor(public msg: NzMessageService) {
  }

  onExpandChanged() {
    this.expand = !this.expand;
  }
}
