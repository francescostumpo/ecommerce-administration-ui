import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {
  // tslint:disable-next-line:typedef
  formateDateDHM(date: Date): string {
    return moment(date).format('DD/MM/yy HH:mm');
  }

  formateDateD(date: Date): string {
    return moment(date).format('DD/MM/yyyy');
  }
}
