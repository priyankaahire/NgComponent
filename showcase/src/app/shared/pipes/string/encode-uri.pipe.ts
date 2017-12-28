import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({
  name: 'encodeURI'
})
export class EncodeURIPipe implements PipeTransform {
  transform (input: any) {
    if (!isString(input)) {
      return input;
    }

    return encodeURI(input);
  }
}
