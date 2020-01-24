import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StateService } from "@app/_services/state.service";

@Component({
  selector: "admin-mini-job-display",
  templateUrl: "./mini-job-display.component.html",
  styleUrls: ["./mini-job-display.component.scss"]
})
export class MiniJobDisplayComponent implements OnInit {
  @Input() job: any;
  @Output() showDetail = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.job
      ? (this.job.applicationStartDate = this.job.applicationStartDate.split(
          "T"
        )[0])
      : null;
    this.job
      ? (this.job.applicationEndDate = this.job.applicationEndDate.split(
          "T"
        )[0])
      : null;
  }

  onDetail() {
    this.showDetail.emit(this.job);
  }
}
