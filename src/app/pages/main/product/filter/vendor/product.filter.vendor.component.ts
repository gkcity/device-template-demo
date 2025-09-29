import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {Vendor} from '../../../../../typedef/define/Vendor';
import {NzTagModule} from 'ng-zorro-antd/tag';

@Component({
  selector: 'product-filter-vendor',
  standalone: true,
  templateUrl: './product.filter.vendor.component.html',
  styleUrls: ['./product.filter.vendor.component.less'],
  imports: [
    NzCardModule,
    NzTagModule
  ],
})
export class ProductFilterVendorComponent {

  @Input() vendors: Vendor[] = [];
  @Output() vendorSelected: EventEmitter<Set<string>> = new EventEmitter();

  all: Vendor = new Vendor('all', '所有厂家');

  onAllChecked(vendor: Vendor, checked: boolean) {
    this.vendors.forEach(x => x.checked = checked);
    this.vendorSelected.emit(this.getSelectedVendors());
  }

  onVendorChecked(vendor: Vendor, checked: boolean) {
    let checkedCount = 0;
    for (let x of this.vendors) {
      checkedCount += x.checked ? 1 : 0;
    }

    this.all.checked = checkedCount === this.vendors.length;
    this.vendorSelected.emit(this.getSelectedVendors());
  }

  private getSelectedVendors(): Set<string> {
    return new Set(this.vendors.filter(x => x.checked).map(x => x.code));
  }
}
