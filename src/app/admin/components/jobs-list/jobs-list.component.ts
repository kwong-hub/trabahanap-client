import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/_services/admin.service";
import { Job } from "@app/_models/Job";
import {
  faSlidersH,
  faPlus,
  faEllipsisV,
  faPenFancy,
  faTrashAlt,
  faBan,
  faInbox
} from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { StateService } from "@app/_services/state.service";

@Component({
  selector: "app-jobs-list",
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"]
})
export class JobsListComponent implements OnInit {
  public jobs: Job[];
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  faSlidersH = faSlidersH;
  faEllipsisV = faEllipsisV;
  faPenFancy = faPenFancy;
  faTrashAlt = faTrashAlt;
  faInbox = faInbox;
  faBan = faBan;
  faPlus = faPlus;
  filterHidden = true;
  openActions = {};
  companyId;

  displayedColumns: string[] = [
    "jobTitle",
    "industry",
    "education",
    "salaryRange",
    "edit"
  ];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.companyId = this.route.snapshot.params.id;
    document.addEventListener("click", () => {
      this.openActions = {};
    });
    this.adminService
      .getAllJobs(1, this.pager ? this.pager.pageSize : 3, this.companyId)
      .subscribe(
        data => {
          //console.log(data)
          if (data.success) {
            this.jobs = data.jobs.rows;
            this.pager = data.jobs.pager;
            //this.jobs = data.jobs;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteJob($event) {
    console.log($event);
  }

  editJob($event) {
    this.stateService.data = $event;
    this.router.navigate([`../../jobs/${this.companyId}/add/${$event.id}`], {
      relativeTo: this.route
    });
  }

  toggleActions($evnet, id) {
    $evnet.stopPropagation();
    this.openActions[id] = !this.openActions[id];
  }

  getServerData(page) {
    this.adminService
      .getAllJobs(page.pageIndex + 1, page.pageSize, this.companyId)
      .subscribe(
        success => {
          if (success.success == true) {
            this.jobs = success.jobs.rows;
            this.pager = success.jobs.pager;
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
  }
}
