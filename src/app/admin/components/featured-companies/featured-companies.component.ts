import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OtherService } from "@app/_services/other.service";
import { ThrowStmt } from "@angular/compiler";
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: "app-featured-companies",
  templateUrl: "./featured-companies.component.html",
  styleUrls: ["./featured-companies.component.scss"]
})
export class FeaturedCompaniesComponent implements OnInit {
  displayedColumns: string[] = ["companyLogo", "companyName", "action"];
  companies = [];
  openConfirmModal = false;
  data: any;
  url: string;

  constructor(
    private Route: ActivatedRoute,
    private otherService: OtherService, private authService: AuthenticationService
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.companies = data.companies;
      }
    });
    let role = this.authService.currentUserValue.role.toLowerCase();
    this.url = `/${role}/employers`;
  }

  ngOnInit() {}

  remove(id) {
    this.otherService.toggleFeaturedCompany(id).subscribe(
      success => {
        if (success.success) {
          this.companies = this.companies.filter(comp => comp.id != id);
        }
      },
      err => console.log(err)
    );
    this.closeModal();
  }

  closeModal() {
    this.openConfirmModal = false;
  }

  openModal(id) {
    this.data = id;
    this.openConfirmModal = true;
  }
}
