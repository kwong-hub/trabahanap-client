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
  CVFileTypes = '.pdf,.doc,.docx';

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
  "     "

  fileChanged(value, name) {
    let type = value.type;
    this.submitted = true;
    if(!(type === 'application/doc' || type === 'application/ms-doc' || type === 'application/msword' || 
      type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || type === 'application/pdf')) {
        this.updateCVForm.controls['cv'].setValue('');
        this.updateCVForm.controls['cv'].setErrors({invalid: true})
        return;
      }
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.closeModalEvent.emit(false);
    this.updateCVForm.controls['cv'].setValue('');
    this.formData = new FormData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateCVForm.invalid) {
      return;
    }
    this.loading = true;
    this.applicantService.changeApplicantCV(this.formData).subscribe(
      success => {
        this.submitted = false;
        if ((success.success, success.applicantProfile)) {
          this.applicantChanged.emit(success.applicantProfile);
          this.loading = false;
          this.formData = new FormData()
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
