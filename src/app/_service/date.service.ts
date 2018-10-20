import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {}

  changeFormatDate(inputDate: string) {
    const tempDate = new Date(inputDate);
    const date =
      tempDate.getFullYear() +
      '-' +
      this.setMonth(tempDate.getMonth()) +
      '-' +
      this.setDay(tempDate.getDate());
    return date;
  }

  getDate(inputDate: Date) {
    const tmpDate =
      this.setDay(inputDate.getDate()) +
      '/' +
      this.setMonth(inputDate.getMonth()) +
      '/' +
      inputDate.getFullYear();
    return tmpDate;
  }

  private setMonth(month: number) {
    month = month + 1;
    let new_month = month.toString();
    if (month === 13) {
      new_month = '01';
    }
    if (month < 10) {
      new_month = '0' + new_month;
    }
    return new_month;
  }

  private setDay(day: number) {
    let new_day = day.toString();
    if (day < 10) {
      new_day = '0' + day;
    }
    return new_day;
  }
}
