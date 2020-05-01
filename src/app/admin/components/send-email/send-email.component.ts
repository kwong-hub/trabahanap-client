import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { Location } from '@angular/common';
import { ngxCsv } from 'ngx-csv';
import { Moment } from 'moment';
import * as moment from 'moment';
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  selected: { startDate: Moment, endDate: Moment };
  public users: any;
  public pager: any;
  public page: any;
  ranges: any = {
    // 'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'phone', 'date'];

  filtered: boolean;
  maxDate = moment().add(1, 'days');
  minDate = moment('2018-01-01');
  showNotify: boolean;
  constructor(private AdminServie: AdminService) { }

  ngOnInit() {
    this.AdminServie.unVerifiedUser({ startDate: moment().subtract(30, 'days'), endDate: moment().format() }, 1, 8).subscribe(
      data => {
        console.log(data)
        if (data.success) {
          this.users = data.user.rows;
          this.pager = data.user.pager;
        }

      }
    )
  }

  sendEmail() {
    if(!this.selected.startDate && !this.selected.endDate){
      this.showNotify = true;
    }
    if (this.selected.startDate && this.selected.endDate && this.filtered) {
      console.log('sending...')
      this.AdminServie.verifyUser({ startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD') }).subscribe(
        data => {
          console.log(data)
        }
      )
    }else{

    }
    
  }
  onDatesUpdated(e) {
    if (e.startDate) {
      this.AdminServie.unVerifiedUser({ startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD') }, 1, 7).subscribe(
        data => {

          console.log(data)
          if (data.success) {
            this.users = data.user.rows;
            this.pager = data.user.pager;
            
          }
          this.filtered = true;
        }
      )
    }
  }

  getServerData(page) {

    this.AdminServie.unVerifiedUser({ startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD') }, page.pageIndex, page.pageSize).subscribe(
      data => {
        if (data.success) {
          this.users = data.user.rows;
          this.pager = data.user.pager;
          
        }
      }
    )

  }







}
