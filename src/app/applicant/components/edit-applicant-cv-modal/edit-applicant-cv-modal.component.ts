import { ApplicantService } from "@app/_services/applicant.service";
import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Router } from "@angular/router";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-edit-applicant-cv-modal",
  templateUrl: "./edit-applicant-cv-modal.component.html",
  styleUrls: ["./edit-applicant-cv-modal.component.scss"]
})
export class EditApplicantCvModalComponent implements OnInit {
  faTimes = faTimes;
  CVFileTypes = ".pdf,.doc,.docx";

  updateCVForm: FormGroup;
  formData = new FormData();
  submited = false;
  showEditLoader = false;

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
      cv: ["", Validators.required]
    });
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.closeModalEvent.emit(false);
    this.updateCVForm.controls["cv"].setValue("");
    this.formData.delete("cv");
  }

  onSubmit() {
    this.submited = true;
    if (this.updateCVForm.invalid) {
      return;
    }
    this.showEditLoader = true;
    this.applicantService.changeApplicantCV(this.formData).subscribe(
      success => {
        if ((success.success, success.applicantProfile)) {
          // console.log(success);
          this.applicantChanged.emit(success.applicantProfile);
          this.showEditLoader = false;
          this.closeModal();
        }
      },
      err => {
        this.showEditLoader = false;
        console.log(err);
      }
    );
  }
}
