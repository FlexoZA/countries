import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: Date, timeZone: string): string {
    let options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Paris', // replace this with the timezone of the capital
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    let formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(value);
  }
}
