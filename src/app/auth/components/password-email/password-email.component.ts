import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-email',
  templateUrl: './password-email.component.html',
  styleUrls: ['./password-email.component.scss']
})
export class PasswordEmailComponent implements OnInit {
  email: any = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(suc => {
      this.email = suc.email;
    });
  }
}
