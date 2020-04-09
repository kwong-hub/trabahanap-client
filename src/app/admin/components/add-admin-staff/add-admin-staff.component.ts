import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-add-admin-staff',
  templateUrl: './add-admin-staff.component.html',
  styleUrls: ['./add-admin-staff.component.scss']
})
export class AddAdminStaffComponent implements OnInit {
  addStaffer: FormGroup;
  submitted = false;
  stafferAdded = false;
  stafferError = false;
  previousStaffs = [];
  companyId;
  defaultLimit = { max: '30', min: '0' };
  numberRange = { max: '20', min: '10' };
  bigLimit = { max: '100', min: '6' };
  roles = [
    { name: 'Admin Staff', value: 'ADMINSTAFF' },
    { name: 'Admin Advertisment', value: 'ADMINADS' }
  ];
  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888', backgroundColor: 'white' },
    optionContainer: { backgroundColor: '#555', top: '3.3rem', boxShadow: '0px 1px 2px #aaa' },
    option: { fontSize: '1.5rem', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminServices: AdminService,
    private Route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.addStaffer = this.formBuilder.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  selectChanged(value, name) {
    this.addStaffer.controls[name].setValue(value);
  }
  onSubmit() {
    this.submitted = true;
    if (!this.addStaffer.valid) {
      return;
    }
    const values = this.addStaffer.value;

    this.adminServices.addAdminStaff(values).subscribe(
      data => {
        console.log(data)
        if (data.success) {
          this.stafferAdded = true;
          this.router.navigate(['../'], { relativeTo: this.Route });
          setTimeout(() => {
            this.stafferAdded = false;
          }, 4000);
        } else {
          this.stafferError = true;
          setTimeout(() => {
            this.stafferError = false;
          }, 4000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
