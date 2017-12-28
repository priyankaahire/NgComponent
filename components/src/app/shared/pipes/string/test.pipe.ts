import { Pipe, PipeTransform  } from '@angular/core';
import { isString } from '../helpers/helpers';


@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {
  transform (input: any, pattern: any, flag: any): any {
    if (!isString(input) || !pattern) {
      return input;
    }

    const regexp = pattern instanceof RegExp ? pattern : new RegExp(pattern, flag);

    return regexp.test(input);
  }
}
