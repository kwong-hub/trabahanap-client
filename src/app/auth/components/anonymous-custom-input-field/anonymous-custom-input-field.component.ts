import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-anonymous-custom-input-field",
  templateUrl: "./anonymous-custom-input-field.component.html",
  styleUrls: ["./anonymous-custom-input-field.component.scss"]
})
export class AnonymousCustomInputFieldComponent implements OnInit {
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
  @Input() styleObject: {
    inputContainer: {};
    input: {};
    label: {};
    feedbackContainer: {};
    feedbackMessage: {};
  };
  @Input() range: { min: ""; max: "" };
  @Input() limit: { min: ""; max: "" };
  errorMessage: string;
  constructor() {}

  ngOnInit() {}
}
