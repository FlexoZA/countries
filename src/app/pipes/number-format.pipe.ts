import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    if (!isNaN(value)) {
      return value.toLocaleString(); // This adds thousand separators
    }

    return value.toString();
  }
}
