import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  users = [];
  company;
  id;
  faCheckCircle = faCheckCircle;
  loading: boolean;
  showLicensePreview=false;
  isDocument: boolean;
  isImage: boolean;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private _location: Location) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if(data.success) {
        this.company = data.employers.company;
        this.users = data.employers.user;
      }
      else {
        this._location.back();
      }
    })
  }

  ngOnInit() {}

  toggleVerify(id) {
    this.loading = true;
    this.adminService.verfifyEmployer(id).subscribe(
      data => {
        if (data.success) {
          this.company = { ...this.company, verified: !this.company.verified };
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  onLicensePreview() {
    this.showLicensePreview = !this.showLicensePreview;
    if(this.showLicensePreview) {
      let ext = this.company.businessLicense.split('.').pop();
      if(ext === 'pdf' || ext === 'doc' || ext === 'docx') {
        console.log(ext)
        this.isDocument = true;
        this.isImage = false;
      }
      else {
        this.isImage = true;
        this.isDocument = false;
      }
    }
  }
}
