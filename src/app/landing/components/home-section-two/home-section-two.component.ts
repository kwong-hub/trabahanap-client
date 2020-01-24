import { Component, OnInit } from "@angular/core";

@Component({
  selector: "landing-home-section-two",
  templateUrl: "./home-section-two.component.html",
  styleUrls: ["./home-section-two.component.scss"]
})
export class HomeSectionTwoComponent implements OnInit {
  adsModal: boolean;

  constructor() {}

  ngOnInit() {}
  toggleAds($event) {
    this.adsModal = !this.adsModal;
  }
}
