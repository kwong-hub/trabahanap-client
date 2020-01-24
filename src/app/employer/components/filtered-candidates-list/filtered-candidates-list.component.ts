import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from './../../../_services/jobs.service';
import { Component, OnInit, Input } from '@angular/core';
import { faUsers, faPenFancy, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';

@Component({
  selector: 'app-filtered-candidates-list',
  templateUrl: './filtered-candidates-list.component.html',
  styleUrls: ['./filtered-candidates-list.component.scss']
})
export class FilteredCandidatesListComponent implements OnInit {
  @Input() pager: any;
  page: any;
  @Input() jobs: any = [];
  faUsers = faUsers;
  faPenFancy = faPenFancy;
  faSlidersH = faSlidersH;
  searchForm: FormGroup;
  displayedColumns: string[] = ['jobTitle', 'position', 'noOfApplicants', 'detail'];

  filterHidden: boolean = true;
  filtered: boolean = false;
  openActions: {};

  constructor(
    private JobsService: JobService, 
    private EmployerService: EmployerService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      jobTitle: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      position: ['', Validators.nullValidator]
    });

    let elem = document.getElementsByClassName('overlay')
    elem[0].addEventListener("click", () => {
      this.openActions = {};
      this.filterHidden = true;
      console.log(this.filterHidden)
    });

    // this.JobsService.getFilteredJobWithApplications(1, this.pager ? this.pager.pageSize : 8)
    //   .subscribe(
    //     success => {
    //       if (success.success == true) {
    //         this.jobs = success.applications.rows;
    //         this.pager = success.applications.pager;
    //       }
    //     },
    //     err => console.log(err)
    //   )
  }

  showCadidates(application) {
    this.router.navigate([`../filtered_candidates/job/${application.jobId}`],{relativeTo: this.route});
  }

  getServerData(page) {
    if (!this.filtered) {
      this.JobsService.getJobWithApplications(page.pageIndex + 1, page.pageSize)
        .subscribe(
          success => {
            if (success.success == true) {
              this.jobs = success.applications.rows;
              this.pager = success.applications.pager;
            }
          },
          err => console.log(err)
        )
    } else {
      var val = this.searchForm.value;
      //console.log(val);
      this.EmployerService.getFilterJobsFilteredApplications(val.jobTitle, val.industry, val.position, page.pageIndex + 1)
        .subscribe(
          data => {
            console.log(data);
            this.jobs = data.applications.rows;
            this.pager = data.applications.pager;
          }
        )

    }

  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobsApplications() {

    var val = this.searchForm.value;
    //console.log(val);
    this.filterHidden = true;
    this.EmployerService.getFilterJobsFilteredApplications(val.jobTitle, val.industry, val.position, this.page || 1)
      .subscribe(
        data => {
          console.log(data);
          this.jobs = data.applications.rows;
          this.pager = data.applications.pager;
        }
      )

    this.filtered = true;

  }


}
