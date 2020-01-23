import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-textarea-field',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss']
})
export class CustomTextareaComponent implements OnInit {

  @Input() placeholder: string;
  @Input() defaultValue: string;
  @Input() label: string;
  @Input() input: any;
  @Input() submitted: boolean;
  @Input() errorMessage: string;
  @Input() type: string;
  @Input() name: string;
  @Input() formGroup: FormGroup;
  @Input() disabled: false;

  constructor() { }

  ngOnInit() {
    // console.log(this.placeholder, this.defaultValue, this.label, this.valid, this.errorMessage, this.type);
  }

}
