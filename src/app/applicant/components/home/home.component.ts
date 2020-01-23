import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'applicant-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dashboardItem1 = {
    value: 1234,
    description: 'Job Applicants',
    percent: '50%',
    percentIncrease: false
  }
  dashboardItem2 = {
    value: 2938,
    description: 'Employers',
    percent: '30%',
    percentIncrease: true
  }
  dashboardItem3 = {
    value: 930,
    description: 'Jobs Applied',
    percent: '10%',
    percentIncrease: false
  }

  dashboardItem4 = {
    value: 1102,
    description: 'Applicants Employed',
    percent: '10%',
    percentIncrease: true
  }

  constructor() { }

  ngOnInit() {
  }

}
