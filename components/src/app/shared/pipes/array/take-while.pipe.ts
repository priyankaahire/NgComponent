import { Pipe, PipeTransform  } from '@angular/core';
import { isArray, takeWhile, CollectionPredicate, isNil } from '../helpers/helpers';

@Pipe({
  name: 'takeWhile'
})
export class TakeWhilePipe implements PipeTransform {
  transform (input: any, predicate?: CollectionPredicate): any {

    if (!isArray(input) || isNil(predicate)) {
      return input;
    }

    return takeWhile(input, predicate);
  }
}
