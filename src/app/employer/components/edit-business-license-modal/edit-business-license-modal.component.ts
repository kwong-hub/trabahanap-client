import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Router } from "@angular/router";
import { EmployerService } from "@app/_services/employer.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-edit-business-license-modal",
  templateUrl: "./edit-business-license-modal.component.html",
  styleUrls: ["./edit-business-license-modal.component.scss"]
})
export class EditBusinessLicenseModalComponent implements OnInit {
  faTimes = faTimes;
  businessLicenseFileTypes = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

  updateBusinessLicenseForm: FormGroup;
  formData = new FormData();
  submited = false;
  loading = false;

  @Input() isModalOpen: boolean;
  @Output() closeModalEvent = new EventEmitter();
  @Output() profileUpdated = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private employerService: EmployerService) {}

  ngOnInit() {
    this.updateBusinessLicenseForm = this.formBuilder.group({
      businessLicense: ['', Validators.required]
    });
  }

  fileChanged(value, name) {
    let type = value.type;
    let size = value.size;
    this.submited = true;
    if(type !== 'application/doc' && type !== 'application/ms-doc' && type !== 'application/msword' && 
    type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && type !== 'application/pdf' && 
    type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
      this.updateBusinessLicenseForm.controls['businessLicense'].setValue('');
      this.updateBusinessLicenseForm.controls['businessLicense'].setErrors({format: true})
      return;
    }
    if(size > 5000000){
      this.updateBusinessLicenseForm.controls['businessLicense'].setValue('');
      this.updateBusinessLicenseForm.controls['businessLicense'].setErrors({maxSize:true})
      return;
    }
    if(this.formData.has(name)) {
      this.formData.delete(name)
    }
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.submited = false;
    this.formData = new FormData()
    this.updateBusinessLicenseForm.reset();
    this.closeModalEvent.emit(false);
  }

  onSubmit() {
    this.submited = true;
    this.updateBusinessLicenseForm.controls["businessLicense"].updateValueAndValidity();
    if (this.updateBusinessLicenseForm.invalid) {
      return;
    }
    this.loading = true;
    this.employerService.chnageBusinessLicense(this.formData).subscribe(
      data => {
        this.submited = false;
        this.loading = false;
        //console.log(data)
        if (data.success) {
          this.profileUpdated.emit(data.companyProfile)
          this.updateBusinessLicenseForm.reset()
          this.formData = new FormData();
        } else {
          this.updateBusinessLicenseForm.controls["businessLicense"].setErrors({failure: true})
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
