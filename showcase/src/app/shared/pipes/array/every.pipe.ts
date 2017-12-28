import { Pipe, PipeTransform  } from '@angular/core';
import { every, CollectionPredicate } from '../helpers/helpers';

@Pipe({
  name: 'every'
})
export class EveryPipe implements PipeTransform {
  transform (input: any, predicate: CollectionPredicate): any {

    return every(input, predicate);
  }
}
