import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-plan-types',
  templateUrl: './plan-types.component.html',
  styleUrls: ['./plan-types.component.scss']
})
export class PlanTypesComponent implements OnInit {
  planTypes = [];
  faPlus = faPlus;
  displayedColumns: string[] = ['planName', 'planType', 'value', 'price', 'action'];
  constructor(private Route: ActivatedRoute, private _location: Location) {}

  ngOnInit() {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success && data.payment_plan_types) {
        this.planTypes = data.payment_plan_types;
      } else {
        // this._location.back();
      }
    });
  }
}
