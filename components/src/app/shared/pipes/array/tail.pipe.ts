import { Pipe, PipeTransform  } from '@angular/core';
import { isArray } from '../helpers/helpers';

@Pipe({
  name: 'tail'
})
export class TailPipe implements PipeTransform {
  transform (input: any): any {

    if (!isArray(input)) {
      return input;
    }

    return input.slice(1, input.length);
  }
}
