import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/_services/admin.service";
import { ActivatedRoute } from "@angular/router";
import {
  faArrowCircleRight,
  faEllipsisV,
  faTimes,
  faPlus,
  faTimesCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-company-locations",
  templateUrl: "./company-locations.component.html",
  styleUrls: ["./company-locations.component.scss"]
})
export class CompanyLocationsComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPlus = faPlus;
  faTimes = faTimes;
  faArrowCircleRight = faArrowCircleRight;
  faEllipsisV = faEllipsisV;
  locations = [];
  displayedColumns: string[] = [
    "picture",
    "locationName",
    "email",
    "headOffice",
    "action"
  ];
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
      .getCompanyLocation(
        1,
        this.pager ? this.pager.pageSize : 3,
        this.companyId
      )
      .subscribe(
        data => {
          //console.log(data);
          if (data.success) {
            this.locations = data.locations.rows;
            this.company = data.locations.company_profile;
            this.pager = data.locations.pager;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getServerData(page) {
    this.adminService
      .getCompanyLocation(page.pageIndex + 1, page.pageSize, this.companyId)
      .subscribe(
        success => {
          if (success.success == true) {
            this.locations = success.locations.rows;
            this.pager = success.locations.pager;
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
  }
}
