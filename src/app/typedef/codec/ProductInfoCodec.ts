import {ProductInfo} from '../define/ProductInfo';
import {Urn, UrnType} from '@jd/xiot-core-spec-ts';

export class ProductInfoCodec {
  static encode(x: ProductInfo): any {
    return {
      name: x.name,
      vendor: x.vendor,
      model: x.model,
      version: x.version,
      type: x.type.toString(),
      id: x.id,
    }
  }

  static decode(x: any): ProductInfo {
    return new ProductInfo(
      x.name || '',
      x.vendor || '',
      x.model || '',
      x.version || 0,
      new Urn([UrnType.DEVICE, UrnType.GROUP], x.type) || Urn.create('null', UrnType.DEVICE, 'null', '00000000'),
      x.id || '',
    );
  }

  static decodeArray(arr: any[]): ProductInfo[] {
    const list: ProductInfo[] = [];
    if (arr != null) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }

  static encodeArray(x: ProductInfo[]): any[] {
    const arr: any[] = [];
    if (x?.length) {
      for (const p of x) {
        arr.push(this.encode(p));
      }
    }
    return arr;
  }
}
