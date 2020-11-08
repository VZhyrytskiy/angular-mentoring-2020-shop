import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform<T>(items: Array<T>, key: string, isAsc: boolean = true): Array<T> {
    if (items?.length === 0) {
      return items;
    }

    const objs = this.cast<Array<object>>(items);
    const sortedObjs = objs.sort(this.getComparator(key, isAsc));

    return this.cast<Array<T>>(sortedObjs);
  }

  private getComparator(key: string, isAsc: boolean): (a: object, b: object) => number {
    if (key.indexOf('.') === -1) {
      return (a, b) => (a[key] > b[key] ? 1 : -1) * (isAsc ? 1 : -1);
    }

    const keys = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');

    return (a, b) => (this.getNestedValue(a, keys) > this.getNestedValue(b, keys) ? 1 : -1) * (isAsc ? 1 : -1);
  }

  private getNestedValue(object: object, keys: string[]): object {
    keys.forEach(key => {
      if (!(key in object)) {
        return false;
      }

      object = object[key];
    });

    return object;
  }

  private cast<T>(item: unknown): T {
    return item as T;
  }
}
