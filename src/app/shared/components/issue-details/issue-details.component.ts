import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  issue: any;
  imageModal: boolean = false;
  faTimes = faTimes;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if(data.success) {
        this.issue = data.issue;
      }

      else { console.log(data) }
    })
  }

  ngOnInit() {
  }

  toggleImageModal() {
    if(this.issue.picture) {
      this.imageModal = !this.imageModal;
    }
  }

}
