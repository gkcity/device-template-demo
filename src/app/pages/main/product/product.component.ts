import {Component, OnInit} from '@angular/core';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzSegmentedComponent, NzSegmentedOptions} from 'ng-zorro-antd/segmented';
import {FormsModule} from '@angular/forms';
import {ProductGridComponent} from './view/grid/product.grid.component';
import {ProductInfo} from '../../../typedef/define/ProductInfo';
import {ProductService} from '../../../service/ProductService';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ProductListComponent} from './view/list/product.list.component';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {ProductFilterTypeComponent} from './filter/type/product.filter.type.component';
import {ProductFilterVendorComponent} from './filter/vendor/product.filter.vendor.component';
import {Type} from '../../../typedef/define/Type';
import {Vendor} from '../../../typedef/define/Vendor';
import {Urn} from 'xiot-core-spec-ts';

@Component({
  selector: 'main-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
  imports: [
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzSegmentedComponent,
    FormsModule,
    ProductGridComponent,
    ProductListComponent,
    NzRowDirective,
    NzColDirective,
    ProductFilterTypeComponent,
    ProductFilterVendorComponent,
  ],
})
export class ProductComponent implements OnInit {

  viewOptions: NzSegmentedOptions = [
    {value: 'Card', icon: 'appstore'},
    {value: 'List', icon: 'bars'}
  ];
  viewMode: number = 0;

  loadingProducts: boolean = false;
  productsOriginal: ProductInfo[] = [];
  products: ProductInfo[] = [];

  types: Type[] = [];
  typesSelected: Set<string> = new Set<string>();

  vendors: Vendor[] = [];
  vendorsSelected: Set<string> = new Set<string>();

  constructor(
    private service: ProductService,
    private msg: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loadingProducts = true;
    this.service.getProducts().subscribe({
      next: data => {
        this.productsOriginal = data;
        this.products = data;
        this.types = this.getTypes();
        this.vendors = this.getVendors();
        this.typesSelected = new Set(this.types.map(x => x.code));
        this.vendorsSelected = new Set(this.vendors.map(x => x.code));
        this.loadingProducts = false;
      },
      error: error => {
        this.msg.warning('Failed to load products');
      }
    })
  }

  getTypes(): Type[] {
    let map: Map<string, Urn> = new Map<string, Urn>();

    for (const x of this.products) {
      map.set(x.type.name, x.type);
    }

    return Array.from(map.values()).map(x => new Type(x.name, x.name));
  }

  getVendors(): Vendor[] {
    let map: Map<string, Vendor> = new Map<string, Vendor>();

    for (const x of this.products) {
      const item = new Vendor(x.vendor, x.vendor);
      map.set(item.code, item);
    }

    return Array.from(map.values());
  }

  onTypesSelected(value: Set<string>) {
    this.typesSelected = value;
    this.updateProducts();
  }

  onVendorsSelected(value: Set<string>) {
    this.vendorsSelected = value;
    this.updateProducts();
  }

  updateProducts() {
    this.products = this.productsOriginal
      .filter(x => this.vendorsSelected.has(x.vendor))
      .filter(x => this.typesSelected.has(x.type.name))
  }
}
