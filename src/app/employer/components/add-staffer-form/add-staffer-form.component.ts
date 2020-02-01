import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtherService } from '@app/_services/other.service';

@Component({
  selector: 'app-add-staffer-form',
  templateUrl: './add-staffer-form.component.html',
  styleUrls: ['./add-staffer-form.component.scss']
})
export class AddStafferFormComponent implements OnInit {
  @Output() staffAdded = new EventEmitter();
  addStaffer: FormGroup;
  submitted: boolean;
  loading: boolean;
  defaultLimit = { max: '30', min: '0' };
  numberRange = { max: '16', min: '10' };
  constructor(private formBuilder: FormBuilder, private otherService: OtherService) {}

  ngOnInit() {
    this.addStaffer = this.formBuilder.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addStaffer.valid) {
      return;
    }

    this.loading = true;
    const values = this.addStaffer.value;

    this.otherService.addStaffer(values).subscribe(
      data => {
        this.submitted = false;
        this.loading = false;
        this.staffAdded.emit(data);
        if (data.success) {
          this.addStaffer.reset();
        }
      },
      error => {
        this.submitted = false;
        this.loading = false;
        console.log(error);
      }
    );
  }
}
