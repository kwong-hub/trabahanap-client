import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '@app/_services/admin.service';
import { faPlus, faCheck, faCheckCircle, faTimesCircle, faSlidersH, faEllipsisV, faArrowCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

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
  displayedColumns: string[] = ['firstName', 'email', 'phoneNumber', 'status','action'];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
    ) {
    this.route.data.subscribe(
      res => {
        let data = res.data;
        console.log(res)
        if (data.success) {

          this.staffs = data.staffs.rows;
          this.pager = data.staffs.pager;
        }
      }
    )
  }

  ngOnInit() {

  }

  getServerData(page) {
    this.adminService.getAdminStaff(page.pageIndex + 1, page.totalItems || 8)
      .subscribe(
        success => {
          if (success.success == true) {
            this.staffs = success.staffs.rows;
            this.pager = success.staffs.pager;
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      )
  }

  activateUser(id) {
    console.log(id)
    this.adminService.deactivateAdminStaff(id)
      .subscribe(
        data => {
          console.log(data)
          this.staffs.forEach(staffs => {
            if (staffs.id === id) {
              staffs.active = !staffs.active;
              //this.openActions[comp.id] = null;
            }
          })
        },
        error => {
          console.log(error)
        }
      )
  }


}
