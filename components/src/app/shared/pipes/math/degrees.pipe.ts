import { Pipe, PipeTransform } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';

@Pipe({
  name: 'degrees'
})
export class DegreesPipe implements PipeTransform {
  transform (input: any): any {
    if (!isNumberFinite(input)) {
      return 'NaN';
    }

    return (input * 180) / Math.PI;
  }
}
