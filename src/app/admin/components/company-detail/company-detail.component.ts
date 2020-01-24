import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/_services/admin.service";
import { ActivatedRoute } from "@angular/router";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-company-detail",
  templateUrl: "./company-detail.component.html",
  styleUrls: ["./company-detail.component.scss"]
})
export class CompanyDetailComponent implements OnInit {
  users = [];
  company;
  id;
  faCheckCircle = faCheckCircle;
  loading: boolean;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.adminService.getEmployerById(this.id).subscribe(
      data => {
        if (data.success) {
          this.company = data.employers.company;
          this.users = data.employers.user;
        }
        console.log(this.company);
      },
      error => {
        console.log(error);
      }
    );
  }

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
}
