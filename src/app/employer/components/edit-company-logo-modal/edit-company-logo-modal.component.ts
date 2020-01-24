import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployerService } from "@app/_services/employer.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services/authentication-service.service";

@Component({
  selector: "app-edit-company-logo-modal",
  templateUrl: "./edit-company-logo-modal.component.html",
  styleUrls: ["./edit-company-logo-modal.component.scss"]
})
export class EditCompanyLogoModalComponent implements OnInit {
  faTimes = faTimes;
  logoFileTypes = ".png,.jpg,.jpeg";

  updateLogoForm: FormGroup;
  formData = new FormData();
  submited = false;
  showEditLoader = false;

  @Input() isModalOpen: boolean;
  @Input() imageUrl: string;
  @Output() closeModalEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.updateLogoForm = this.formBuilder.group({
      companyLogo: ["", Validators.required]
    });
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.closeModalEvent.emit(false);
    this.updateLogoForm.controls["companyLogo"].setValue("");
    this.formData.delete("companyLogo");
  }

  onSubmit() {
    this.submited = true;
    if (this.updateLogoForm.invalid) {
      return;
    }
    this.showEditLoader = true;
    this.employerService.changeCompanyLogo(this.formData).subscribe(
      success => {
        if (success.success) {
          const user = this.authService.currentUserValue;
          user.company_profile = success.companyProfile;
          this.authService.updateCurrentUser(user);
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
