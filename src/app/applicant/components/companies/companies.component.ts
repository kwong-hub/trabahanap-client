import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApplicantService } from "@app/_services/applicant.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"]
})
export class CompaniesComponent implements OnInit {
  searchForm: FormGroup;
  jobs: Array<object> = [];
  bookmarks: boolean = true;
  displayedColumns: string[] = [
    "companyLogo",
    "jobName",
    "companyName",
    "action"
  ];
  filterHidden: boolean = true;
  filtered: boolean = false;
  faSlidersH = faSlidersH;
  public pager: any;
  public page: 1;

  constructor(
    private applicantService: ApplicantService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let elem = document.getElementsByClassName("overlay");
    elem[0].addEventListener("click", () => {
      // this.openActions = {};
      this.filterHidden = true;
      console.log(this.filterHidden);
    });

    this.searchForm = this.formBuilder.group({
      jobtitle: ["", Validators.nullValidator],
      industry: ["", Validators.nullValidator],
      companyName: ["", Validators.nullValidator]
    });

    this.route.data.subscribe(
      data => {
        console.log(data);
        this.pager = data.jobs.pager;
        this.jobs = data.jobs.rows;
      },
      error => console.log(error)
    );
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobs() {
    var val = this.searchForm.value;
    //console.log(val.SalaryRange);
    this.filterHidden = true;
    this.applicantService
      .getFilterSavedJobs(
        val.jobtitle || "",
        val.industry || "",
        val.companyName || "",
        this.page || 1
      )
      .subscribe(data => {
        console.log(data);
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
      });

    this.filtered = true;
  }

  getServerData(page) {
    this.applicantService.getSavedJobs(page.pageIndex + 1).subscribe(
      data => {
        if (data.success == true) {
          this.jobs = data.jobs.rows;
          this.pager = data.jobs.pager;
        }
      },
      err => console.log(err)
    );
  }
}
