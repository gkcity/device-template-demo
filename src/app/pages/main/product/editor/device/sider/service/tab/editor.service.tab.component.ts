import {Component, Input} from '@angular/core';
import {Service} from '@jd/xiot-core-spec-ts';
import {PropertiesControllerComponent} from '../../../common/tables/properties/properties.component';
import {ActionsControllerComponent} from '../../../common/tables/actions/actions.component';
import {EventsControllerComponent} from '../../../common/tables/events/events.component';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzCardModule} from 'ng-zorro-antd/card';

@Component({
  selector: 'editor-service-tab',
  templateUrl: './editor.service.tab.component.html',
  styleUrls: ['./editor.service.tab.component.less'],
  standalone: true,
  imports: [
    NzTabsModule,
    NzCardModule,
    PropertiesControllerComponent,
    ActionsControllerComponent,
    EventsControllerComponent,
  ],
})
export class EditorServiceTabComponent {

  @Input() service!: Service;
  @Input() language: string = 'zh-CN';
}
