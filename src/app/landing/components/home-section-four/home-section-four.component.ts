import { Component, OnInit } from '@angular/core';
import { AnonymousService } from '@app/_services/anonymous.service';

@Component({
  selector: 'landing-home-section-four',
  templateUrl: './home-section-four.component.html',
  styleUrls: ['./home-section-four.component.scss']
})
export class HomeSectionFourComponent implements OnInit {
  cityCount;
  jobCount;
  constructor(private anonymosService:AnonymousService) {
  
   }

  ngOnInit() {
    this.anonymosService.getCityCount().subscribe(
      data =>{
        // console.log(data)
        if(data.success){
          this.cityCount = data.cityCount.city;
          this.jobCount = data.cityCount.job;
          
        }
      }
    )
  }

}
