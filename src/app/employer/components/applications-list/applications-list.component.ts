import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faPlus,
  faEllipsisV,
  faArrowCircleRight,
  faTimes,
  faCheck,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@app/_services/admin.service";
import { EmployerService } from "@app/_services/employer.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-applications-list",
  templateUrl: "./applications-list.component.html",
  styleUrls: ["./applications-list.component.scss"]
})
export class ApplicationsListComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;
  faArrowCircleRight = faArrowCircleRight;
  faTimes = faTimes;
  faCheckCircle = faCheck;
  faCheckSquare = faCheck;
  faSlidersH = faSlidersH;
  applications = [];
  public pager: any;
  public page: any;
  searchForm: FormGroup;
  displayedColumns: string[] = [
    "firstName",
    "email",
    "jobtitle",
    "applicationDate",
    "hired",
    "detail"
  ];
  filterHidden: boolean = true;
  filtered: boolean = false;
  constructor(
    private employerService: EmployerService,
    private Route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.pager = data.applications.pager;
        this.applications = data.applications.rows;
      }
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      applicantName: ["", Validators.nullValidator],
      jobtitle: ["", Validators.nullValidator]
    });
  }

  getServerData(page) {
    if (!this.filtered) {
      this.employerService.getApplications(page.pageIndex + 1).subscribe(
        success => {
          if (success.success == true) {
            this.applications = success.applications.rows;
            this.pager = success.applications.pager;
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
    } else {
      var val = this.searchForm.value;
      this.employerService.getFilterApplications(val.applicantName,val.jobtitle,page.pageIndex + 1,page.pageSize)
      .subscribe(
        data => {
          //console.log(data);
          this.applications = data.applications.rows;
          this.pager = data.applications.pager;
        });
    }
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  showApplicantDetail(applications) {
    this.router.navigate(
      [
        `../candidates/job/${applications.jobId}/applicant/${applications.applicantId}`
      ],
      { relativeTo: this.route }
    );
  }

  filterApplications() {
    var val = this.searchForm.value;
    //console.log(val);
    this.filterHidden = true;
    this.employerService.getFilterApplications(val.applicantName,val.jobtitle,this.page || 1,8)
      .subscribe(
        data => {
          //console.log(data);
          this.applications = data.applications.rows;
          this.pager = data.applications.pager;
        }
      )

    this.filtered = true;
  }
}
