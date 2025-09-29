import {Action, Service} from '@jd/xiot-core-spec-ts';

export interface IActionData {
  did: string;
  service: Service;
  action: Action;
}
