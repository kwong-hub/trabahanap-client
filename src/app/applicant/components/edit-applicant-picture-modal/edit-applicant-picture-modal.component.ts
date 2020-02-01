import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApplicantService } from '@app/_services/applicant.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-applicant-picture-modal',
  templateUrl: './edit-applicant-picture-modal.component.html',
  styleUrls: ['./edit-applicant-picture-modal.component.scss']
})
export class EditApplicantPictureModalComponent implements OnInit {
  faTimes = faTimes;
  applicantPictureFileTypes = '.png,.jpg,.jpeg';

  updateApplicnatPictureForm: FormGroup;
  formData = new FormData();
  submited = false;
  showEditLoader = false;

  @Input() isModalOpen: boolean;
  @Input() applicantPictureUrl: string;
  @Output() closeModalEvent = new EventEmitter();
  @Output() applicantChanged = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private applicantService: ApplicantService) {}

  ngOnInit() {
    this.updateApplicnatPictureForm = this.formBuilder.group({
      applicantPicture: ['', Validators.required]
    });
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.closeModalEvent.emit(false);
    this.updateApplicnatPictureForm.controls['applicantPicture'].setValue('');
    this.formData.delete('applicantPicture');
  }

  onSubmit() {
    this.submited = true;

    if (this.updateApplicnatPictureForm.invalid) {
      return;
    }
    this.showEditLoader = true;

    this.applicantService.changeApplicantPicture(this.formData).subscribe(
      success => {
        if ((success.success, success.applicantProfile)) {
          this.applicantChanged.emit(success.applicantProfile);
          this.showEditLoader = false;
          this.closeModal();
        }
      },
      err => {
        this.closeModal();
        this.showEditLoader = false;
      }
    );
  }
}
