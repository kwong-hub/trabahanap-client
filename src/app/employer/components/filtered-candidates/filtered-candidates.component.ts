import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-filtered-candidates",
  templateUrl: "./filtered-candidates.component.html",
  styleUrls: ["./filtered-candidates.component.scss"]
})
export class FilteredCandidatesComponent implements OnInit {
  pager: any;
  rows: any;

  constructor() {
    // this.Route.data.subscribe(res => {
    //   let filters = res.filters;
    //   if (filters.success) {
    //     this.pager = filters.applications.pager;
    //     this.rows = filters.applications.rows;
    //   }
    // });
  }

  ngOnInit() {}
}
