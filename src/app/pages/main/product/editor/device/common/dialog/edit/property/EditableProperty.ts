import {Property, Service} from '@jd/xiot-core-spec-ts';

export class EditableProperty {

  constructor(
    public service: Service,
    public property: Property,
  ) {
  }
}
