import { Pipe, PipeTransform  } from '@angular/core';
import { createRound, isString } from '../helpers/helpers';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {
  transform (value: any, precision: any = 0): any {
    if (isString(precision)) {
      precision = parseInt(precision, 10);
    }
    return createRound('floor')(value, precision);
  }
}
