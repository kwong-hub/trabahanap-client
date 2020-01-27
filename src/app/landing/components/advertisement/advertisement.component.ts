import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { AnonymousService } from "@app/_services/anonymous.service";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { interval } from "rxjs";
@Component({
  selector: "app-advertisement",
  templateUrl: "./advertisement.component.html",
  styleUrls: ["./advertisement.component.scss"]
})
export class AdvertisementComponent implements OnInit {
  faTimes = faTimes;
  advertisement = [];
  @Input() isAds: boolean;
  @Output() closeModalEvent = new EventEmitter();

  displayed:any;
  id: any;
  counter: number = Math.floor(Math.random() * 4);
  intervalMs = 50000;
  adsChange;
  constructor(private anonyService: AnonymousService) {}

  ngOnInit() {
    this.anonyService.getAdvertisement().subscribe(data => {
      if (data.success && data.ads.length) this.advertisement = data.ads;
      this.counter = Math.floor(Math.random() * this.advertisement.length);
      this.displayed = this.advertisement[this.counter];
    });

    let count = interval(this.intervalMs);
    this.adsChange = count.subscribe(val => {
      this.displayed = this.advertisement[this.counter];
      this.counter++;
      if (this.counter >= this.advertisement.length) {
        this.counter = 0;
      }
    });
  }

  ngOnDestroy() {
    this.adsChange.unsubscribe();
  }

  closeAds() {
    this.closeModalEvent.emit(false);
  }
}
