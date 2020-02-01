import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { EmployerService } from '@app/_services/employer.service';
import { faPlus, faEllipsisV, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faTimes = faTimes;
  locations: Array<object>;
  noLocation: boolean = true;
  displayedColumns: string[] = ['picture', 'name', 'address', 'phoneNumber', 'action'];
  confirm: boolean;

  constructor(private Route: ActivatedRoute, private router: Router) {
    this.Route.data.subscribe(res => {
      let locations = res.data;
      if (locations.success) {
        if (locations.locations.length !== 0) {
          this.noLocation = false;
        }
        this.locations = locations.locations;
      }
    });
  }

  ngOnInit() {
    // this.employerService.getCompanyLocations().subscribe(
    //   data => {
    //     if(data.success) {
    //       if(data.locations.length !== 0) {
    //         this.noLocation = false;
    //       }
    //       this.locations = data.locations;
    //     }
    //   }
    // );
  }

  confirmDelete(id) {
    this.confirm = true;
  }

  deleteLocation(id) {
    // console.log(id);
  }

  editLocation($event) {
    this.router.navigate([`../branches/${$event}`], { relativeTo: this.Route });
  }
}
