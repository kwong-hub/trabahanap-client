import { Component, OnInit } from "@angular/core";
import {
  faArrowCircleRight,
  faEllipsisV,
  faTimes,
  faPlus,
  faTimesCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@app/_services/admin.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-staff-list",
  templateUrl: "./staff-list.component.html",
  styleUrls: ["./staff-list.component.scss"]
})
export class StaffListComponent implements OnInit {
  faPlus = faPlus;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faTimes = faTimes;
  faArrowCircleRight = faArrowCircleRight;
  faEllipsisV = faEllipsisV;
  staffs = [];
  displayedColumns: string[] = ["firstName", "email", "phoneNumber", "action"];
  company: any;
  public pager: any;
  public page: any;
  companyId;

  constructor(
    private adminService: AdminService,
    private Route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companyId = this.Route.snapshot.params.id;
    this.adminService
      .getCompanyStaffs(1, this.pager ? this.pager.pageSize : 3, this.companyId)
      .subscribe(
        data => {
          // console.log(data)
          if (data.success) {
            this.staffs = data.staffs;
            //this.company = data.staff.company_profile;
            //this.pager = data.locations.pager;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getServerData(page) {
    this.adminService
      .getCompanyStaffs(page.pageIndex + 1, page.pageSize, this.companyId)
      .subscribe(
        success => {
          if (success.success == true) {
            this.staffs = success.staffs;
            //this.pager = success.locations.pager;
            //this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
  }
}
