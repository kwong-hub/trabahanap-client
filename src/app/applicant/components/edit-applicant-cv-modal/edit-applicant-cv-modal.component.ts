import { ApplicantService } from '@app/_services/applicant.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-applicant-cv-modal',
  templateUrl: './edit-applicant-cv-modal.component.html',
  styleUrls: ['./edit-applicant-cv-modal.component.scss']
})
export class EditApplicantCvModalComponent implements OnInit {
  faTimes = faTimes;
  CVFileTypes = '.pdf,.doc,.docx, .png, .jpg, jpeg';

  updateCVForm: FormGroup;
  formData = new FormData();
  submitted = false;
  loading: boolean;

  @Input() isModalOpen: boolean;
  @Input() cvUrl: string;
  @Output() closeModalEvent = new EventEmitter();
  @Output() applicantChanged = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.updateCVForm = this.formBuilder.group({
      cv: ['', Validators.required]
    });
  }


  fileChanged(value, name) {
    let type = value.type;
    let size = value.size;
    this.submitted = true;
    if(type !== 'application/doc' && type !== 'application/ms-doc' && type !== 'application/msword' && 
      type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && type !== 'application/pdf' && 
      type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
        this.updateCVForm.controls['cv'].setValue('');
        this.updateCVForm.controls['cv'].setErrors({format: true})
        return;
      }

    if(size > 4000000){
      this.updateCVForm.controls['cv'].setValue('');
      this.updateCVForm.controls['cv'].setErrors({maxSize:true})
      return;
    }
    if(this.formData.has(name)) {
      this.formData.delete(name)
    }
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.submitted = false;
    this.formData = new FormData();
    this.updateCVForm.reset();
    this.closeModalEvent.emit(false);
  }

  onSubmit() {
    this.submitted = true;
    this.updateCVForm.controls['cv'].updateValueAndValidity();
    if (this.updateCVForm.invalid) {
      return;
    }
    this.loading = true;
    this.applicantService.changeApplicantCV(this.formData).subscribe(
      data => {
        console.log(data)
        this.submitted = false;
        this.loading = false;
        // console.log(data)
        if (data.success) {
          this.applicantChanged.emit(data.applicantProfile);
          this.updateCVForm.reset();
          this.formData = new FormData()
        } else {
          this.updateCVForm.controls['cv'].setErrors({failure: true})
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
