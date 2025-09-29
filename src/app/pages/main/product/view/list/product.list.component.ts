import {Component, Input} from '@angular/core';
import {ProductInfo} from '../../../../../typedef/define/ProductInfo';
import {NzTableModule} from 'ng-zorro-antd/table';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'product-list',
  standalone: true,
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.less'],
  imports: [
    NzTableModule,
    RouterLink
  ],
})
export class ProductListComponent {

  @Input() products: ProductInfo[] = [];
}
