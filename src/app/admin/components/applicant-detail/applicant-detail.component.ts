import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {
  id;
  applicant:any;
  loading: boolean;
  faCheckCircle = faCheckCircle;

  constructor(
    private adminService:AdminService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.adminService.getApplicantById(this.id).subscribe(
      data => {
        //console.log(data)
        if(data.success) {
          
          this.applicant = data.applicant;
          //this.applicant['active'] = data.applicant.user.active;
        }
        console.log(this.applicant);
      },
      error => {
        console.log(error);
      }
    )
  }

  toggleActivate(id) {
    this.loading = true;
    this.adminService.deactivateUser(id).subscribe(
      data => {
        if(data.success) {
          
          this.applicant = {...this.applicant, active: !this.applicant.user.active};
          this.applicant.user.active = !this.applicant.user.active
          this.loading = false;
          
        }
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    )
  }

}
