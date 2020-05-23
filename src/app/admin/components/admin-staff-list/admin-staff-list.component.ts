import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '@app/_services/admin.service';
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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})
export class AdminStaffListComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;
  faArrowCircleRight = faArrowCircleRight;
  faTimes = faTimes;
  faCheck = faCheck;
  faSlidersH = faSlidersH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  addStaffer: FormGroup;
  submitted = false;
  stafferAdded = false;
  stafferError = false;
  staffs = [];
  pager: any;
  displayedColumns: string[] = ['firstName', 'email', 'role', 'phoneNumber', 'status', 'action'];

  constructor(private adminService: AdminService, private route: ActivatedRoute, private location: Location) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.staffs = data.staffs.rows;
        this.pager = data.staffs.pager;
      }
    });
  }

  ngOnInit() {}

  getServerData(page) {
    this.adminService.getAdminStaff(page.pageIndex + 1, page.pageSize || 8).subscribe(
      data => {
        if (data.success == true) {
          this.staffs = data.staffs.rows;
          this.pager = data.staffs.pager;
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
  }

  activateUser(id) {
    this.adminService.deactivateAdminStaff(id).subscribe(
      data => {
        this.staffs.forEach(staffs => {
          if (staffs.id === id) {
            staffs.active = !staffs.active;
            //this.openActions[comp.id] = null;
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
