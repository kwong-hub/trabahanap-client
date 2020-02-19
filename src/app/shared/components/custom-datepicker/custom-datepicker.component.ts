import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss']
})
export class CustomDatepickerComponent implements OnInit {
  monthsOfTheYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  active: boolean = false;
  months = [];
  currentMonthDays = [];
  year: any;
  month: any;
  day: any;
  currentDay: any;
  currentMonth: any;
  currentYear: any;
  inputDate: string = '';
  daysBeforeStartOfMonth: any;
  monthdays: any[];
  @Input() default: any;
  @Input() placeholder: string;
  @Input() defaultValue: string;
  @Input() name: string;
  @Input() submitted: boolean;
  @Input() valids: any;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() styleObject;
  @Output() onValueChange = new EventEmitter();
  // @Input() range: { min: ""; max: "" };

  constructor() {
    let d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.day = d.getDate();
    this.months = this.getMonths(this.year);
    this.currentMonthDays = this.months[this.month];
    this.getDaysBeforeStartOfMonth();
  }

  ngOnInit() {
    document.addEventListener('click', () => {
      this.active = false;
    });
    if (this.defaultValue) {
      this.inputDate = this.defaultValue;
      const [year, month, day] = this.inputDate.split('-');
      this.updateInput(year, month, day);
    } else {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      this.updateInput(year, month, day);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName == 'defaultValue') {
        let defaultValue = change.currentValue;
        if (defaultValue) {
          const [year, month, day] = defaultValue.split('-');
          this.updateInput(year, month, day);
        }
      }
    }
  }

  updateInput(year, month, day) {
    //@ts-ignore
    if (year && month && day && !isNaN(year) && !isNaN(month) && !isNaN(day)) {
      this.currentYear = this.year = parseInt(year);
      this.currentMonth = this.month = parseInt(month) - 1;
      this.currentDay = this.day = parseInt(day);
      this.renderDate();
    }
  }

  inputClicked($event) {
    $event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.active = !this.active;
  }

  yearPrev($event) {
    $event.stopPropagation();
    this.year = this.year - 1;
    this.updateMonths();
  }

  yearNext($event) {
    $event.stopPropagation();
    this.year = this.year + 1;
    this.updateMonths();
  }

  decadePrev($event) {
    $event.stopPropagation();
    this.year = this.year - 10;
    this.updateMonths();
  }

  decadeNext($event) {
    $event.stopPropagation();
    this.year = this.year + 10;
    this.updateMonths();
  }

  monthPrev($event) {
    $event.stopPropagation();
    if (this.month == 0) {
      this.year = this.year - 1;
      this.month = 11;
    } else {
      this.month = this.month - 1;
    }
    this.updateMonthDays();
    this.updateMonths();
  }

  monthNext($event) {
    $event.stopPropagation();
    if (this.month == 11) {
      this.year = this.year + 1;
      this.month = 0;
    } else {
      this.month = this.month + 1;
    }
    this.updateMonthDays();
    this.updateMonths();
  }

  dateSelected(day) {
    this.day = day;
    this.renderDate();
    this.active = !this.active;
  }

  renderDate() {
    this.inputDate = `${this.year}-${this.returnTwoDigit(this.month + 1)}-${this.returnTwoDigit(this.day)}`;
    this.onValueChange.emit(this.inputDate);
    this.currentDay = this.day;
    this.currentMonth = this.month;
    this.currentYear = this.year;
  }

  returnTwoDigit(digit) {
    var newDigit = digit.toString().length == 1 ? '0' + digit : digit;
    return newDigit;
  }

  updateMonthDays() {
    this.currentMonthDays = this.months[this.month];
  }

  updateMonths() {
    this.months = this.getMonths(this.year);
    this.updateMonthDays();
    this.getDaysBeforeStartOfMonth();
  }

  getMonths(year) {
    let feb = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;
    let months = [];
    let monthdays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.monthdays = monthdays;
    for (let j = 0; j < 12; j++) {
      let month = [];
      for (let i = 1; i <= monthdays[j]; i++) {
        month.push(i);
      }
      months.push(month);
    }
    return months;
  }

  getDaysBeforeStartOfMonth() {
    var month = this.month + 1;
    var day = new Date(this.year + '-' + month + '-01').getDate();
    day = day == 0 ? 7 : day;
    // var days = [];
    // for(var i=1;i<day;i++){
    //   days.push(i);
    // }
    // return days;
    var days = this.getDaysFromPrevMonth(day - 1);
    this.daysBeforeStartOfMonth = days;
  }

  getDaysFromPrevMonth(noDays) {
    var daysOfMonth = this.monthdays[this.month - 1 < 0 ? 11 : this.month - 1];
    var days = [];
    for (var i = 1; i <= noDays; i++) {
      days.push(daysOfMonth - (noDays - i));
    }
    return days;
  }

  stopClickPropacation(event) {
    event.stopPropagation();
  }
}
