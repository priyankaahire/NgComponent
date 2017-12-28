import { Pipe, PipeTransform  } from '@angular/core';
import { createRound, isString } from '../helpers/helpers';

@Pipe({
  name: 'ceil'
})
export class CeilPipe implements PipeTransform {
  transform (value: any, precision: any = 0): any {
    if (isString(precision)) {
      precision = parseInt(precision, 10);
    }
    return createRound('ceil')(value, precision);
  }
}
