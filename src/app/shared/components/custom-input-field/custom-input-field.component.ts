import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-custom-input-field',
  templateUrl: './custom-input-field.component.html',
  styleUrls: ['./custom-input-field.component.scss']
})
export class CustomInputFieldComponent implements OnInit {

  @Input() placeholder: string;
  @Input() defaultValue: string;
  @Input() label: string;
  @Input() input: any;
  @Input() submitted: boolean;
  @Input() type: string;
  @Input() name: string;
  @Input() formGroup: FormGroup;
  @Input() disabled: false;
  @Input() accept: string;
  @Input() styleObject: {'inputContainer': {}, 'input': {}, 'label': {}, 'feedbackContainer': {}, 'feedbackMessage': {}};
  @Input() range: {'min': '', 'max': ''};
  errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
