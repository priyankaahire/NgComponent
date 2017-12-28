import { Pipe, PipeTransform  } from '@angular/core';
import { isArray, takeUntil, CollectionPredicate, isNil } from '../helpers/helpers';

@Pipe({
  name: 'takeUntil'
})
export class TakeUntilPipe implements PipeTransform {
  transform (input: any, predicate?: CollectionPredicate): any {

    if (!isArray(input) || isNil(predicate)) {
      return input;
    }

    return takeUntil(input, predicate);
  }
}
