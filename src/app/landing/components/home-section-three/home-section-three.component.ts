import { Component, OnInit } from '@angular/core';
import { AnonymousService } from '@app/_services/anonymous.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherService } from '@app/_services/other.service';

@Component({
  selector: 'landing-home-section-three',
  templateUrl: './home-section-three.component.html',
  styleUrls: ['./home-section-three.component.scss']
})
export class HomeSectionThreeComponent implements OnInit {

  featured: any;
  key: any;
  cityName: any;

  constructor(private otherService: OtherService, private Route: ActivatedRoute,private router: Router,) { }

  ngOnInit() {
    this.otherService.getFeaturedCompanies().subscribe(
      data => {
        this.featured = data.companies;
        // console.log(this.featured)
        let i=1;
        this.featured.map(item => {
          item.companyLogo = `assets/img/pseudo/Logo${i}.png`;
          i++;
        });

      }
    )
  }

  searchJobs($event) {
    this.router.navigate([`featured/jobs`],{queryParams:{companyId:$event}});
    return false;
}

}
