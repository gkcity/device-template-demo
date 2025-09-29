import {Component, Input} from '@angular/core';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {ProductInfo} from '../../../../../typedef/define/ProductInfo';
import {NzCardModule} from 'ng-zorro-antd/card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'product-grid',
  standalone: true,
  templateUrl: './product.grid.component.html',
  styleUrls: ['./product.grid.component.less'],
  imports: [
    NzRowDirective,
    NzColDirective,
    NzCardModule,
    RouterLink,
  ],
})
export class ProductGridComponent {

  @Input() products: ProductInfo[] = [];
}
