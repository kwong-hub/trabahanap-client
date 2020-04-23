import { JobService } from '@app/_services/jobs.service';

import { Component, OnInit, Input } from '@angular/core';
import { faUsers, faPenFancy, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { count } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  panelOpenState = false;
  @Input() jobs: any = [];
  faUsers = faUsers;
  faPenFancy = faPenFancy;
  faSlidersH = faSlidersH;
  displayedColumns: string[] = ['jobTitle', 'noOfPositions', 'postedDate', 'endDate', 'noOfApplicants', 'detail'];
  public page: any;
  matPager: any = {
    pageIndex: 0,
    pageSize: 5
  };
  @Input() pager: any;
  searchForm: FormGroup;
  filterHidden: boolean = true;
  filtered: boolean = false;
  openActions: {};
  defaultLimit = { max: '50', min: '0' };
  empty = false;
  hasValues = false;
  constructor(
    private JobsService: JobService,
    private EmployerService: EmployerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      jobTitle: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      position: ['', Validators.nullValidator],
      active: [false]
    });

    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      this.openActions = {};
      this.filterHidden = true;
    });

    this.jobs.length == 0 ? (this.empty = true) : (this.hasValues = true);

    // this.route.queryParams.subscribe(
    //   data => {
    //     this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
    //     this.getServerData(this.matPager);
    //   },
    //   err => console.log(err)
    // );
  }

  updateExpansionState(jobId) {}

  showCadidates(application) {
    this.router.navigate([`../candidates/job/${application.jobId}`], {
      relativeTo: this.route
    });
  }

  getServerData(page) {
    if (!this.filtered) {
      this.JobsService.getJobWithApplications(page.pageIndex + 1, page.pageSize).subscribe(
        success => {
          if (success.success == true) {
            this.jobs = success.applications.rows;
            this.pager = success.applications.pager;
            this.jobs.length == 0 ? (this.empty = true) : (this.hasValues = true);
            let path = this.location.path();
            if (path.indexOf('page') >= 0 && this.pager.currentPage <= 10) {
              path = path.replace(/.$/, this.pager.currentPage.toString());
              this.location.go(path);
            } else if (path.indexOf('page') >= 0 && this.pager.currentPage >= 10) {
              path = path.replace(/page=[0-9][0-9]/, `page=${this.pager.currentPage.toString()}`);
              this.location.go(path);
            } else {
              path = path.concat(`?page=${this.pager.currentPage}`);
              this.location.go(path);
            }
          }
        },
        err => console.log(err)
      );
    } else {
      var val = this.searchForm.value;
      this.EmployerService.getFilterJobsApplications(
        val.jobTitle,
        val.industry,
        val.position,
        !val.active,
        page.pageIndex + 1,
        page.pageSize
      ).subscribe(data => {
        if (data.success == true) {
          this.jobs = data.applications.rows;
          this.jobs.length == 0 ? (this.empty = true) : (this.hasValues = true);
          this.pager = data.applications.pager;
          let path = this.location.path();
          if (path.indexOf('page') >= 0) {
            path = path.replace(/.$/, this.pager.currentPage.toString());
            this.location.go(path);
          } else {
            path = path.concat(`?page=${this.pager.currentPage}`);
            this.location.go(path);
          }
        }
      });
    }
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobsApplications() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.EmployerService.getFilterJobsApplications(
      val.jobTitle,
      val.industry,
      val.position,
      !val.active,
      this.page || 1,
      8
    ).subscribe(data => {
      this.jobs = data.applications.rows;
      this.pager = data.applications.pager;
    });

    this.filtered = true;
  }
}
