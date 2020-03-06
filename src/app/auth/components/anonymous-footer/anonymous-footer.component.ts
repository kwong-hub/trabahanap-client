import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Component, OnInit } from "@angular/core";
import { environment } from '@environments/environment';

@Component({
  selector: "app-landing-footer",
  templateUrl: "./anonymous-footer.component.html",
  styleUrls: ["./anonymous-footer.component.scss"]
})
export class AnonymousFooterComponent implements OnInit {
  year: any;
  version = environment.version;
  
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
