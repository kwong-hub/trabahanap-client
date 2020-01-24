import { Component, OnInit } from "@angular/core";
import {
  faPlus,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faSlidersH,
  faEllipsisV,
  faArrowCircleRight,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@app/_services/admin.service";
import _ from "lodash";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-applicant-list",
  templateUrl: "./applicant-list.component.html",
  styleUrls: ["./applicant-list.component.scss"]
})
export class ApplicantListComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;
  faArrowCircleRight = faArrowCircleRight;
  faTimes = faTimes;
  faCheck = faCheck;
  faSlidersH = faSlidersH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  applicants = [];
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "status",
    "action"
  ];
  public pager: any;
  public page: any;
  searchForm: FormGroup;
  filterHidden = true;
  filtered = false;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private Route: ActivatedRoute
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        data.applicants.rows.forEach(apps => {
          this.applicants.push(apps.user);
        });
        this.pager = data.applicants.pager;
      } else {
        console.log(data);
      }
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: ["", Validators.nullValidator],
      email: ["", Validators.nullValidator]
    });

    let elem = document.getElementsByClassName("overlay");
    elem[0].addEventListener("click", () => {
      // this.openActions = {};
      this.filterHidden = true;
      console.log(this.filterHidden);
    });

    // this.adminService.getAllApplicants(1).subscribe(
    //   data => {
    //     //console.log(data);
    //     if(data.success) {
    //       data.applicants.rows.forEach(apps => {
    //         this.applicants.push(apps.user)
    //       });
    //       this.pager = data.applicants.pager;
    //     }
    //     console.log(this.applicants)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  getServerData(page) {
    if (!this.filtered) {
      this.adminService.getAllApplicants(page.pageIndex + 1).subscribe(
        success => {
          this.applicants = [];
          if (success.success == true) {
            success.applicants.rows.forEach(apps => {
              this.applicants.push(apps.user);
            });
            this.pager = success.applicants.pager;
          }
        },
        err => console.log(err)
      );
    } else {
      var val = this.searchForm.value;
      this.adminService
        .getFilterApplicants(val.name, val.email, page.pageIndex + 1)
        .subscribe(data => {
          this.applicants = [];
          data.applicants.rows.forEach(apps => {
            this.applicants.push(apps.user);
          });
          this.pager = data.applicants.pager;
        });
    }
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterApplicants() {
    var val = this.searchForm.value;
    //console.log(val);
    this.filterHidden = true;
    this.adminService
      .getFilterApplicants(val.name || "", val.email || "", this.page || 1)
      .subscribe(data => {
        //console.log(data);
        this.applicants = data.applicants.rows;
        this.pager = data.applicants.pager;
      });

    this.filtered = true;
  }

  activateUser(id) {
    this.adminService.deactivateUser(id).subscribe(
      data => {
        console.log(data);
        this.applicants.forEach(applicant => {
          if (applicant.id === id) {
            applicant.active = !applicant.active;
            //this.openActions[comp.id] = null;
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
