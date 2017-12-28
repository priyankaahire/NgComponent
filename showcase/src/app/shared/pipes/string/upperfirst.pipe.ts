import { Pipe, PipeTransform } from '@angular/core';
import { isString, upperFirst } from '../helpers/helpers';

@Pipe({
  name: 'upperfirst'
})
export class UpperFirstPipe implements PipeTransform {
  transform(input: any): any {
    if (!isString(input)) {
      return input;
    }

    return upperFirst(input);
  }
}
