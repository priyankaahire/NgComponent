import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({
  name: 'decodeURI'
})
export class DecodeURIPipe implements PipeTransform {
  transform (input: any) {
    if (!isString(input)) {
      return input;
    }

    return decodeURI(input);
  }
}
