import { Component, OnInit } from "@angular/core";
import {
  faPlus,
  faEllipsisV,
  faArrowCircleRight,
  faTimes,
  faCheck,
  faSlidersH,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AdminService } from "@app/_services/admin.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-advertisement-list",
  templateUrl: "./advertisement-list.component.html",
  styleUrls: ["./advertisement-list.component.scss"]
})
export class AdvertisementListComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;
  faArrowCircleRight = faArrowCircleRight;
  faTimes = faTimes;
  faCheck = faCheck;
  faSlidersH = faSlidersH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  ads = [];
  displayedColumns: string[] = [
    "title",
    "image",
    "adsStart",
    "adsEnd",
    "status",
    "action"
  ];
  public pager: any;
  public page: any;
  searchForm: FormGroup;
  filterHidden = true;
  filtered = false;
  constructor(
    private adminService: AdminService,
    private Route: ActivatedRoute
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.ads = data.ads.rows;
        this.pager = data.ads.pager;
      } else {
      }
    });
  }

  ngOnInit() {}

  activateAds(id) {
    this.adminService.deactivateAds(id).subscribe(
      data => {
        // console.log(data)
        this.ads.forEach(ads => {
          if (ads.id === id) {
            ads.active = !ads.active;
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
