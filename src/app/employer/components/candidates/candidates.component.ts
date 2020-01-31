import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  pager: any;
  rows: any;

  constructor(private Route: ActivatedRoute) {
    this.Route.data.subscribe(res => {
      let candidates = res.candidates;
      if (candidates.success) {
        this.rows = candidates.applications.rows;
        this.pager = candidates.applications.pager;
        console.log(this.rows);
      }
    });
  }

  ngOnInit() {}
}
