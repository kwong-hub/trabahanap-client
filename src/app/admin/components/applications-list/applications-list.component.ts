import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faCheckCircle,
  faCheck,
  faSlidersH,
  faTimesCircle,
  faEllipsisV,
  faArrowCircleRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '@app/_services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  displayedColumns: string[] = [
    'firstName',
    'email',
    'phoneNumber',
    'jobtitle',
    'Employeer',
    'applicationDate',
    'hired'
  ];
  filterHidden: boolean = true;
  filtered: boolean = false;
  openActions: {};
  defaultLimit = { max: '50', min: '0' };
  empty = false;
  hasValues = false;
  matPager: any = {
    pageIndex: 0,
    pageSize: 8
  };

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    // this.route.data.subscribe(res => {
    //   let data = res.data;
    //   if (data.success) {
    //     this.applications = data.applications.rows;
    //     this.pager = data.applications.pager;
    //   } else {
    //   }
    // });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.nullValidator],
      applicantName: ['', Validators.nullValidator],
      jobtitle: ['', Validators.nullValidator],
      companyName: ['', Validators.nullValidator]
    });

    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      this.openActions = {};
      this.filterHidden = true;
    });

    this.route.queryParams.subscribe(
      data => {
        this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
        this.getServerData(this.matPager);
      },
      err => console.log(err)
    );

    // this.adminService.getAllApplications(1).subscribe(
    //   data => {

    //     if(data.success){
    //       this.applications = data.applications.rows;
    //       this.pager = data.applications.pager;
    //     }
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  getServerData(page) {
    if (!this.filtered) {
      this.adminService.getAllApplications(page.pageIndex + 1, page.pageSize).subscribe(
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
      this.adminService
        .getFilterApplications(val.applicantName, val.jobtitle, val.companyName, page.pageIndex + 1, page.pageSize)
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

  filterApplications() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.adminService
      .getFilterApplications(val.applicantName, val.jobtitle, val.companyName, this.page || 1, 8)
      .subscribe(data => {
        this.applications = data.applications.rows;
        this.pager = data.applications.pager;
      });
    this.filtered = true;
  }
}
