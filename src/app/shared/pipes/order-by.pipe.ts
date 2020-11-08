import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  private static getComparator(key: string): (a: object, b: object) => number {
    if (key.indexOf('.') === -1) {
      return (a, b) => a[key] > b[key] ? 1 : -1;
    }

    const keys = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');

    return (a, b) => OrderByPipe.getNestedValue(a, keys) > OrderByPipe.getNestedValue(b, keys) ? 1 : -1;
  }

  private static getNestedValue(object: object, keys: string[]): object {
    keys.forEach(key => {
      if (!(key in object)) {
        return false;
      }

      object = object[key];
    });

    return object;
  }

  transform(items: Array<object>, key: string, reverse: boolean = false): Array<object> {
    if (items?.length === 0) {
      return items;
    }

    const sorted = items.sort(OrderByPipe.getComparator(key));

    if (reverse) {
      return sorted.reverse();
    }

    return sorted;
  }
}
