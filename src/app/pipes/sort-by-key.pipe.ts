import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash-es';

@Pipe({
  name: 'sortByKey',
})
export class SortByKeyPipe implements PipeTransform {
  transform<T>(object: { [key: string]: T }): T[] {
    if (isEmpty(object)) {
      return [];
    }

    return Object.entries(object)
      .sort()
      .map(([_, value]) => value);
  }
}
