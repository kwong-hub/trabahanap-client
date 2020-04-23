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
    this.formData.append(name, value, value.name);
  }

  closeModal() {
    this.closeModalEvent.emit(false);
    this.formData.delete("businessLicense");
    this.updateBusinessLicenseForm.controls["businessLicense"].setValue("");
  }

  onSubmit() {
    this.submited = true;
    if (this.updateBusinessLicenseForm.invalid) {
      return;
    }
    this.loading = true;
    this.employerService.chnageBusinessLicense(this.formData).subscribe(
      data => {
        this.loading = false;
        //console.log(data)
        if (data.success) {
          this.formData.delete("businessLicense");
          this.updateBusinessLicenseForm.controls["businessLicense"].setValue("");
          this.profileUpdated.emit(data.companyProfile)
        } else {
          this.closeModal();
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
