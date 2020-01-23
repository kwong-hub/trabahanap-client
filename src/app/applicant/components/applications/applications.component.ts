import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faSlidersH, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApplicantService } from '@app/_services/applicant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faTimes = faTimes;
  filterHidden: boolean = true;
  filtered: boolean = false;
  faSlidersH = faSlidersH;
  public pager: any;
  public page: 1;
  jobs: any = [];
  applications: boolean = true;
  displayedColumns: string[] = ['companyLogo', 'jobName', 'companyName', 'action'];
  searchForm: FormGroup;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(
      data => {
        console.log(data)
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
        // this.pager = s
      },
      error => console.log(error)
    );

    let elem = document.getElementsByClassName('overlay')
    elem[0].addEventListener("click", () => {
      // this.openActions = {};
      this.filterHidden = true;
      console.log(this.filterHidden)
    });

    this.searchForm = this.formBuilder.group({
      jobtitle: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      companyName: ['', Validators.nullValidator]
    });


  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobs() {
    var val = this.searchForm.value;
    //console.log(val.SalaryRange);
    this.filterHidden = true;
    this.applicantService.getFilterAppliedJobs(val.jobtitle || '', val.industry || '', val.companyName || '', this.page || 1)
      .subscribe(
        data => {
          //console.log(data);
          this.jobs = data.jobs.rows;
          this.pager = data.jobs.pager;
        }
      )

    this.filtered = true;

  }

  getServerData(page) {
    if (this.filtered) {
      var val = this.searchForm.value;
      this.applicantService.getFilterAppliedJobs(val.jobtitle || '', val.industry || '', val.companyName || '', page.pageIndex + 1 || 1)
        .subscribe(
          data => {
            //console.log(data);
            this.jobs = data.jobs.rows;
            this.pager = data.jobs.pager;
          }
        )

    } else {
      this.applicantService.getJobApplications(page.pageIndex + 1)
        .subscribe(
          success => {
            if (success.success == true) {
              this.jobs = success.jobs.rows;
              this.pager = success.jobs.pager;
              // this.pager.pages = this.renderedPages();
            }
          },
          err => console.log(err)
        )
    }

  }

}
