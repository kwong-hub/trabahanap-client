import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-simple-file-input',
  templateUrl: './simple-file-input.component.html',
  styleUrls: ['./simple-file-input.component.scss']
})
export class SimpleFileInputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() defaultValue: string;
  @Input() label: string;
  @Input() input: any;
  @Input() submitted: boolean;
  @Input() type: string;
  @Input() name: string;
  @Input() disabled: false;
  @Input() accept: string;
  @Input() errorMessage: string;
  @Output() onValueChange = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  onFileChange(input){
    var val = input.target.files[0] ? input.target.files[0] : null;
    this.onValueChange.emit(val);
  }

}
