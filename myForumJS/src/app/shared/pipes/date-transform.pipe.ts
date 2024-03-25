import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(date: string, ...args: unknown[]): unknown {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

}
