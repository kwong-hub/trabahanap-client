import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './anonymous-footer.component.html',
  styleUrls: ['./anonymous-footer.component.scss']
})
export class AnonymousFooterComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
