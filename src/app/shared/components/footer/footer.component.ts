import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: any;
  version = environment.version;
  
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
