import { Pipe, PipeTransform  } from '@angular/core';
import { pad, isString } from '../helpers/helpers';


@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {
  transform (input: any, length: number = 0, character: string = ' '): any {
    if (!isString(input)) {
      return input;
    }

    return pad(input, length, character);
  }
}
