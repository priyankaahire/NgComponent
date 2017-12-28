import { Pipe, PipeTransform  } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';

@Pipe({
  name: 'sqrt'
})
export class SqrtPipe implements PipeTransform {
  transform (input: any): any {
    if (!isNumberFinite(input)) {
      return 'NaN';
    }

    return Math.sqrt(input);
  }
}
