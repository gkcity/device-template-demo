import {Service, Property} from '@jd/xiot-core-spec-ts';

export interface IPropertyData {
  did: string;
  service: Service;
  property: Property;
}
