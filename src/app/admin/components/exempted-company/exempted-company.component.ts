import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherService } from '@app/_services/other.service';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: 'app-exempted-company',
  templateUrl: './exempted-company.component.html',
  styleUrls: ['./exempted-company.component.scss']
})
export class ExemptedCompanyComponent implements OnInit {
  companies: any;
  url: string;
  public pager: any;
  public page: any;
  data: any;
  displayedColumns: string[] = ["companyLogo", "companyName","date", "action"];
  openConfirmModal = false;
  constructor(private Route: ActivatedRoute,
    private otherService: OtherService, private authService: AuthenticationService) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.companies = data.companies.company;
        this.pager = data.companies.pager;
      }
    });
    let role = this.authService.currentUserValue.role.toLowerCase();
    this.url = `/${role}/employers`;
   }

  ngOnInit() {
  }

  getServerData(page) {
    this.otherService.getExemptCompanies(page.pageIndex+1,page.pageSize).subscribe(
      data=>{
        if (data.success) {
          this.companies = data.companies.company;
          this.pager = data.companies.pager;
        }
      }
    )
  }

  openModal(id) {
    this.data = id;
    this.openConfirmModal = true;
  }

  remove(id) {
    this.otherService.toggleExemptCompany(id).subscribe(
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

}
