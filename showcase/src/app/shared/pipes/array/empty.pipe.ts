import { Pipe, PipeTransform  } from '@angular/core';
import { empty } from '../helpers/helpers';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {
  transform (input: any): any {

    return empty(input);
  }
}
