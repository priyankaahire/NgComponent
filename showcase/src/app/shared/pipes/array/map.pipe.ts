import { Pipe, PipeTransform  } from '@angular/core';
import { isArray } from '../helpers/helpers';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {
  transform (input: any, fn: Function): any {

    if (!isArray(input) || !fn) {
      return input;
    }

    return input.map(fn);
  }
}
