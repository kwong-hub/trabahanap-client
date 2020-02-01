import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'shared-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, OnChanges {
  @Input() options: any[];
  @Input() default: any;
  @Input() placeholder: string;
  @Input() defaultValue: string;
  @Input() name: string;
  @Input() submitted: boolean;
  @Input() valid: any;
  @Input() label: string;
  @Input() disabled: false;
  @Input() styleObject: {
    inputContainer: {};
    inputHeader: {};
    label: {};
    optionContainer: {};
    option: { color: 'blue' };
    feedbackContainer: {};
    feedbackMessage: {};
  };
  @Output() onValueChange = new EventEmitter();

  currentValue = '';
  isOpen = false;

  constructor() {}

  ngOnInit() {
    document.addEventListener('click', () => {
      this.isOpen = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let optionValue;
    for (let propName in changes) {
      let change = changes[propName];
      if (propName == 'defaultValue') {
        let curVal = change.currentValue;
        if (curVal) {
          this.currentValue = curVal;
          this.getValue(this.options);
        } else {
          this.currentValue = null;
        }
      }
      if (propName == 'options') {
        let curVal = change.currentValue;
        optionValue = curVal ? curVal : [];
        this.getValue(optionValue);
      }
    }
  }

  getValue(options) {
    var retrunVal = '';
    _.map(options, (value, key) => {
      if (value.value == this.defaultValue) {
        retrunVal = key;
        this.currentValue = value.name;
      }
    });

    return retrunVal;
  }

  selectClicked($event) {
    $event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  optionItemClicked($event, option) {
    $event.stopPropagation();
    this.onValueChange.emit(option.value);
    this.isOpen = false;
    this.currentValue = option.name;
  }
}
