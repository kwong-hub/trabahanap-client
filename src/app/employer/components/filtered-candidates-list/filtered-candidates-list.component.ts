import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from './../../../_services/jobs.service';
import { Component, OnInit, Input } from '@angular/core';
import { faUsers, faPenFancy, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';
import { Location } from '@angular/common';

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
  displayedColumns: string[] = ['jobTitle', 'noOfPositions', 'postedDate', 'endDate', 'noOfApplicants', 'detail'];

  filterHidden: boolean = true;
  filtered: boolean = false;
  defaultLimit = { max: '50', min: '0' };
  openActions: {};
  matPager: any = {
    pageIndex: 0,
    pageSize: 5
  };
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

  showCadidates(application) {
    this.router.navigate([`../filtered_candidates/job/${application.jobId}`], {
      relativeTo: this.route
    });
  }

  getServerData(page) {
    if (!this.filtered) {
      this.JobsService.getFilteredJobWithApplications(page.pageIndex + 1, page.pageSize).subscribe(
        success => {
          if (success.success == true) {
            this.jobs = success.applications.rows;
            this.pager = success.applications.pager;
            this.jobs.length == 0 ? (this.empty = true) : (this.hasValues = true);
            let path = this.location.path();
            if (path.indexOf('page') >= 0) {
              path = path.replace(/.$/, this.pager.currentPage.toString());
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
      this.EmployerService.getFilterJobsFilteredApplications(
        val.jobTitle,
        val.industry,
        val.position,
        !val.active,
        page.pageIndex + 1,
        page.pageSize
      ).subscribe(data => {
        this.jobs = data.applications.rows;
        this.pager = data.applications.pager;
        this.jobs.length == 0 ? (this.empty = true) : (this.hasValues = true);
        let path = this.location.path();
        if (path.indexOf('page') >= 0) {
          path = path.replace(/.$/, this.pager.currentPage.toString());
          this.location.go(path);
        } else {
          path = path.concat(`?page=${this.pager.currentPage}`);
          this.location.go(path);
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
    this.EmployerService.getFilterJobsFilteredApplications(
      val.jobTitle,
      val.industry,
      val.position,
      !val.active,
      this.page || 1,
      6
    ).subscribe(data => {
      this.jobs = data.applications.rows;
      this.pager = data.applications.pager;
    });

    this.filtered = true;
  }
}
