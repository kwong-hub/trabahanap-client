import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router } from '@angular/router';
import { EmployerService } from '@app/_services/employer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-business-license-modal',
  templateUrl: './edit-business-license-modal.component.html',
  styleUrls: ['./edit-business-license-modal.component.scss']
})
export class EditBusinessLicenseModalComponent implements OnInit {

  faTimes = faTimes;
  businessLicenseFileTypes = ".pdf,.doc,.docx";

  updateBusinessLicenseForm: FormGroup;
  formData = new FormData();
  submited = false;
  showEditLoader = false;

  @Input() isModalOpen: boolean;
  @Output() closeModalEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService, 
  ) { }

  ngOnInit() {

    this.updateBusinessLicenseForm = this.formBuilder.group({
      businessLicense: ['', Validators.required],
    });
  }

  fileChanged(value, name){
    this.formData.append(name, value, value.name);
  }

  closeModal(){
    this.closeModalEvent.emit(false)
    this.formData.delete('businessLicense');
    this.updateBusinessLicenseForm.controls['businessLicense'].setValue('');  
  }

  onSubmit(){
    this.submited = true;
    if(this.updateBusinessLicenseForm.invalid){return;}
    this.showEditLoader = true;
    this.employerService.chnageBusinessLicense(this.formData)
      .subscribe(
        success => {
          this.showEditLoader = false; 
          if(success.success){
            this.closeModal();
          }else{
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
