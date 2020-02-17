import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report-job-list',
  templateUrl: './report-job-list.component.html',
  styleUrls: ['./report-job-list.component.scss']
})
export class ReportJobListComponent implements OnInit {
  displayedColumns: string[] = ['jobTitle', 'reportType', 'comment', 'name', 'email', 'action'];
  reports = [];
  constructor(private adminService: AdminService,private Route:ActivatedRoute,private _location:Location) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      // console.log(data)
      if(data.success) {
        this.reports = data.reports;
      }
      else {
        this._location.back();
      }
    })
  }

  ngOnInit() {
  }
}
