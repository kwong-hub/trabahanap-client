import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faSlidersH,
  faEllipsisV,
  faArrowCircleRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '@app/_services/admin.service';
import _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
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
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'status', 'createdAt', 'action'];
  public pager: any;
  public page: any;
  searchForm: FormGroup;
  filterHidden = true;
  filtered = false;
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
    //     data.applicants.rows.forEach(apps => {
    //       this.applicants.push(apps.user);
    //     });
    //     this.pager = data.applicants.pager;
    //   } else {
    //   }
    // });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.nullValidator],
      email: ['', Validators.nullValidator],
      registrationDate: ['', Validators.nullValidator]
    });

    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      // this.openActions = {};
      this.filterHidden = true;
    });

    this.route.queryParams.subscribe(
      data => {
        this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
        this.getServerData(this.matPager);
      },
      err => console.log(err)
    );
  }

  getServerData(page) {
    if (!this.filtered) {
      this.adminService.getAllApplicants(page.pageIndex + 1, page.pageSize).subscribe(
        success => {
          this.applicants = [];
          if (success.success == true) {
            success.applicants.rows.forEach(apps => {
              this.applicants.push(apps.user);
            });
            this.pager = success.applicants.pager;
            this.applicants.length == 0 ? (this.empty = true, this.hasValues = false) : (this.hasValues = true, this.empty = false);
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
      this.adminService.getFilterApplicants(val.name, val.email, val.registrationDate, page.pageIndex + 1, page.pageSize)
        .subscribe(data => {
          this.applicants = data.applicants.rows;
          // data.applicants.rows.forEach(apps => {
          //   this.applicants.push(apps.user)
          // });
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
    this.filterHidden = true;
    this.adminService.getFilterApplicants(val.name || '', val.email || '', val.registrationDate, this.page || 1, 10).subscribe(data => {
      this.applicants = data.applicants.rows;
      this.pager = data.applicants.pager;
      this.applicants.length == 0 ? (this.empty = true, this.hasValues = false) : (this.hasValues = true, this.empty = false);
    });

    this.filtered = true;
  }

  activateUser(id) {
    this.adminService.deactivateUser(id).subscribe(
      data => {
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
  
  customValueChanged(value, name) {
    this.searchForm.controls[name].setValue(value);
  }
}
