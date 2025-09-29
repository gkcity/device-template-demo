import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  DeviceInstanceCodec,
  UrnType,
  Service,
} from "xiot-core-spec-ts";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute} from "@angular/router";
import {NzBreadCrumbComponent} from 'ng-zorro-antd/breadcrumb';
import {
  NzPageHeaderBreadcrumbDirective,
  NzPageHeaderContentDirective,
  NzPageHeaderModule,
} from 'ng-zorro-antd/page-header';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {EditorSliderComponent} from './device/sider/editor.slider.component';
import {FormsModule} from '@angular/forms';
import {NzSegmentedModule} from 'ng-zorro-antd/segmented';
import {DeviceInstance} from 'xiot-core-spec-ts/dist/xiot/core/spec/typedef/instance/DeviceInstance';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {ProductService} from '../../../../service/ProductService';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzSwitchModule} from 'ng-zorro-antd/switch';

@Component({
  selector: 'product-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  standalone: true,
  imports: [
    FormsModule,
    NzBreadCrumbComponent,
    NzPageHeaderBreadcrumbDirective,
    NzPageHeaderModule,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzPageHeaderContentDirective,
    NzMenuModule,
    NzLayoutModule,
    NzSegmentedModule,
    EditorSliderComponent,
    NzSpinComponent,
    NzTagModule,
    NzRadioModule,
    NzButtonModule,
    NzSpaceModule,
    NzSwitchModule,
  ],
  providers: [
  ],
})
export class EditorComponent implements OnInit, OnDestroy{

  changed: boolean = false;

  // 语言
  language: string = 'zh-CN';

  // 版本
  version: boolean = false;

  // 专家模式
  expert: boolean = false;

  loading: boolean = true;
  type: string = '';
  instance: DeviceInstance | undefined = undefined;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
  ) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.type = this.route.snapshot.params['type'];
    this.load(this.type);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  onChanged(device: DeviceInstance) {
    this.changed = true;
  }

  onClickType() {
    if (this.instance !== undefined) {
      // window.open(this.product.getInstanceUrl(this.instance.type), '_blank');
    }
  }

  private load(type: string): void {
    this.service.getInstance(type).subscribe({
      next: data => {
        this.instance = DeviceInstanceCodec.decode(data);
        this.loading = false;
      },
      error: error => {
        this.msg.warning('Failed to load products');
      }
    })
  }

  protected readonly UrnType = UrnType;


  onReload() {
    this.load(this.type);
    this.changed = false;
  }

  onRemove(service: Service) {
    this.instance?.services.delete(service.iid);
  }
}
