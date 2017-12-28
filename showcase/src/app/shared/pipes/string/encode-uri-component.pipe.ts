import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({
  name: 'encodeURIComponent'
})
export class EncodeURIComponentPipe implements PipeTransform {
  transform (input: any) {
    if (!isString(input)) {
      return input;
    }

    return encodeURIComponent(input);
  }
}
