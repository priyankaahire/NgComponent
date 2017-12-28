import { Pipe, PipeTransform } from '@angular/core';
import { isArray, sum } from '../helpers/helpers';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
  transform(input: any): any {
    return !isArray(input) ? input : sum(input);
  }
}
