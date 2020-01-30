import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: any;
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
