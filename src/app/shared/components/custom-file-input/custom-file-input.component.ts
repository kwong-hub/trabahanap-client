import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "shared-custom-file-input",
  templateUrl: "./custom-file-input.component.html",
  styleUrls: ["./custom-file-input.component.scss"]
})
export class CustomFileInputComponent implements OnInit {
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
  @Output() onValueChange = new EventEmitter();

  errorMessage: string;

  constructor() {}

  ngOnInit() {}

  onFileChange(input) {
    var val = input.target.files[0] ? input.target.files[0] : null;
    this.onValueChange.emit(val);
  }
}
