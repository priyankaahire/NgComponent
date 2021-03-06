import { Pipe, PipeTransform } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';

@Pipe({
  name: 'radians'
})
export class RadiansPipe implements PipeTransform {
  transform (input: any): any {
    if (!isNumberFinite(input)) {
      return 'NaN';
    }

    return (input * Math.PI) / 180;
  }
}
