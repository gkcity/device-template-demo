import {Urn} from 'xiot-core-spec-ts';

export class ProductInfo {

  constructor(
    public name: string = '',
    public vendor: string = '',
    public model: string = '',
    public version: number = 1,
    public type: Urn,
    public id: string = ''
  ) {
  }
}
