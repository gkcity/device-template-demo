import {Service, Argument} from 'xiot-core-spec-ts';

export class SelectArgument {

  constructor(
    public service: Service,
    public exclusion: Set<number>,
    public language: string,
  ) {
  }
}
