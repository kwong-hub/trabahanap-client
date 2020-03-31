import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import {
  faPlus,
  faSlidersH,
  faEllipsisV,
  faCheck,
  faTimes,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherService } from '@app/_services/other.service';
import { ThrowStmt } from '@angular/compiler';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies = [];
  displayedColumns: string[] = ['companyLogo', 'companyName', 'totalJobs', 'status', 'createdAt', 'action'];
  searchForm: FormGroup;
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;
  faCheck = faCheck;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faSlidersH = faSlidersH;
  openActions = {};
  public pager: any;
  public page: any;
  totalJobs: any;
  filterHidden = true;
  filtered = false;
  reachedMaxFeatured = false;
  defaultLimit = { max: '50', min: '0' };
  empty = false;
  hasValues = false;
  matPager: any = {
    pageIndex: 0,
    pageSize: 8
  };

  constructor(
    private otherService: OtherService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    // this.Route.data.subscribe(res => {
    //   let data = res.data;
    //   if (data.success) {
    //     this.companies = data.employers.rows;
    //     this.pager = data.employers.pager;
    //     this.countotalJobs();
    //   } else {
    //   }
    // });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      companyName: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      verify: [''],
      registrationDate: ['', Validators.nullValidator]
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

  }

  verifyCompany(id) {
    this.adminService.verfifyEmployer(id).subscribe(
      data => {
        this.companies.forEach(comp => {
          if (comp.id === id) {
            comp.verified = !comp.verified;
            this.openActions[comp.id] = null;
          }
        });
      },
      error => {}
    );
  }

  countotalJobs() {
    this.companies.forEach(comp => {
      this.adminService.getAllJobs(1, 2, comp.id).subscribe(data => {
        comp['totalJobs'] = data.jobs.pager.totalItems;
      });
    });
  }

  toggleActions($evnet, id) {
    $evnet.stopPropagation();
    let value = this.openActions[id];
    this.openActions = {};
    this.openActions[id] = !value;
  }

  getServerData(page) {
    if (this.filtered) {
      var val = this.searchForm.value;
      this.adminService
        .getFilterEmployers(val.companyName, val.industry,val.verify, val.registrationDate, page.pageIndex + 1, page.pageSize)
        .subscribe(data => {
          if (data) {
            this.companies = data.companies.rows;
            this.pager = data.companies.pager;
            this.companies.length == 0 ? (this.empty = true, this.hasValues = false) : (this.hasValues = true, this.empty = false);
            let path = this.location.path();
            if (path.indexOf('page') >= 0) {
              path = path.replace(/.$/, this.pager.currentPage.toString());
              this.location.go(path);
            } else {
              path = path.concat(`?page=${this.pager.currentPage}`);
              this.location.go(path);
            }
          }
          this.countotalJobs();
        });
    } else {
      this.adminService.getAllEmployers(page.pageIndex + 1, page.pageSize).subscribe(
        success => {
          if (success.success == true) {
            this.companies = success.employers.rows;
            this.pager = success.employers.pager;
            this.companies.length == 0 ? (this.empty = true, this.hasValues = false) : (this.hasValues = true, this.empty = false);
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
          this.countotalJobs();
        },
        err => console.log(err)
      );
    }
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterEmployers() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.adminService.getFilterEmployers(val.companyName, val.industry, val.verify, val.registrationDate, this.page || 1, 8).subscribe(data => {
    if (data) {
      this.companies = data.companies.rows;
      this.pager = data.companies.pager;
      this.companies.length === 0 ? (this.empty = true, this.hasValues = false) : (this.hasValues = true, this.empty = false);
    }
    this.countotalJobs();
    });

    this.filtered = true;
  }

  toggleFeatured(event, id) {
    this.otherService.toggleFeaturedCompany(id).subscribe(
      success => {
        if (success.success) {
          this.companies = this.companies.map(comp => {
            if (comp.id == id) {
              let newComp = { ...comp, featured: !comp.featured };
              return newComp;
            } else {
              return comp;
            }
          });
        } else {
          if (success.message == 'maximum_featured_companies_reached') {
            this.reachedMaxFeatured = true;
            setTimeout(() => {
              this.reachedMaxFeatured = false;
            }, 3000);
          }
        }
      },
      err => console.log(err)
    );
    let value = this.openActions[id];
    this.openActions = {};
    this.openActions[id] = !value;
  }

  toggleExempt(event,id){
    this.otherService.toggleExemptCompany(id).subscribe(
      success => {
        if (success.success) {
          this.companies = this.companies.map(comp => {
            if (comp.id == id) {
              let newComp = { ...comp, featured: !comp.featured };
              return newComp;
            } else {
              return comp;
            }
          });
        } else {
          if (success.message == 'maximum_featured_companies_reached') {
            this.reachedMaxFeatured = true;
            setTimeout(() => {
              this.reachedMaxFeatured = false;
            }, 3000);
          }
        }
      },
      err => console.log(err)
    );
    let value = this.openActions[id];
    this.openActions = {};
    this.openActions[id] = !value;
  }

  customValueChanged(value, name) {
    this.searchForm.controls[name].setValue(value);
  }
}
