import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  faPlus,
  faEllipsisV,
  faArrowCircleRight,
  faTimes,
  faCheck,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '@app/_services/admin.service';
import { EmployerService } from '@app/_services/employer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
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
  displayedColumns: string[] = ['picture', 'jobtitle', 'firstName', 'vacancies', 'applicationDate', 'hired', 'detail'];
  filterHidden: boolean = true;
  filtered: boolean = false;
  defaultLimit = { max: '50', min: '0' };
  empty = false;
  hasValues = false;
  matPager: any = {
    pageIndex: 0,
    pageSize: 5
  };

  constructor(
    private employerService: EmployerService,
    private Route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.pager = data.applications.pager;
        this.applications = data.applications.rows;
      }
    });

    // this.route.queryParams.subscribe(
    //   data => {
    //     this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
    //     this.getServerData(this.matPager);
    //   },
    //   err => console.log(err)
    // );
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      applicantName: ['', Validators.nullValidator],
      jobtitle: ['', Validators.nullValidator]
    });
    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      this.filterHidden = true;
    });
  }

  getServerData(page) {
    if (!this.filtered) {
      this.employerService.getApplications(page.pageIndex + 1).subscribe(
        success => {
          if (success.success == true) {
            this.applications = success.applications.rows;
            this.pager = success.applications.pager;
            this.applications.length == 0 ? (this.empty = true) : (this.hasValues = true);

            let path = this.location.path();
            if (path.indexOf('page') >= 0) {
              path = path.replace(/.$/, this.pager.currentPage.toString());
              this.location.go(path);
            } else {
              path = path.concat(`?page=${this.pager.currentPage}`);
              this.location.go(path);
            }
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
    } else {
      var val = this.searchForm.value;
      this.employerService
        .getFilterApplications(val.applicantName, val.jobtitle, page.pageIndex + 1, page.pageSize)
        .subscribe(data => {
          this.applications = data.applications.rows;
          this.pager = data.applications.pager;
          this.applications.length == 0 ? (this.empty = true) : (this.hasValues = true);
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

  showApplicantDetail(applications) {
    this.router.navigate([`../candidates/job/${applications.jobId}/applicant/${applications.applicantId}`], {
      relativeTo: this.route
    });
  }

  filterApplications() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.employerService.getFilterApplications(val.applicantName, val.jobtitle, this.page || 1, 8).subscribe(data => {
      this.applications = data.applications.rows;
      this.pager = data.applications.pager;
    });

    this.filtered = true;
  }
}
