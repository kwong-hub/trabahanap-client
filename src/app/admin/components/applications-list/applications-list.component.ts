import { Component, OnInit } from "@angular/core";
import {
  faPlus,
  faCheckCircle,
  faCheck,
  faSlidersH,
  faTimesCircle,
  faEllipsisV,
  faArrowCircleRight,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@app/_services/admin.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

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
    "phoneNumber",
    "jobtitle",
    "Employeer",
    "applicationDate",
    "hired"
  ];
  filterHidden: boolean = true;
  filtered: boolean = false;
  openActions: {};
  defaultLimit ={max:"50",min:"0"};
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.applications = data.applications.rows;
        this.pager = data.applications.pager;
      } else {
        console.log(data);
      }
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ["", Validators.nullValidator],
      applicantName: ["", Validators.nullValidator],
      jobtitle: ["", Validators.nullValidator],
      companyName: ["", Validators.nullValidator]
    });

    let elem = document.getElementsByClassName("overlay");
    elem[0].addEventListener("click", () => {
      this.openActions = {};
      this.filterHidden = true;
      console.log(this.filterHidden);
    });

    // this.adminService.getAllApplications(1).subscribe(
    //   data => {

    //     if(data.success){
    //       this.applications = data.applications.rows;
    //       this.pager = data.applications.pager;
    //       //console.log(this.applications);
    //     }
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  getServerData(page) {
    if (!this.filtered) {
      this.adminService.getAllApplications(page.pageIndex+1,page.pageSize)
      .subscribe(
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
      this.adminService.getFilterApplications(val.applicantName,val.jobtitle,val.companyName,page.pageIndex + 1,page.pageSize)
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

  filterApplications() {
    var val = this.searchForm.value;
    //console.log(val);
    this.filterHidden = true;
    this.adminService.getFilterApplications(val.applicantName,val.jobtitle,val.companyName,this.page || 1,8)
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
