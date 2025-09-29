import {Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {EditorComponent} from './editor/editor.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'editor/:type',
    data: { breadcrumb: '编辑' },
    component: EditorComponent
  },
];
