import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faSlidersH, faEdit, faTimes, faToolbox, faClock, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ApplicantService } from '@app/_services/applicant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faMapMarkerAlt = faMapMarkerAlt;
  faToolbox = faToolbox;
  faClock = faClock;
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faTimes = faTimes;
  filterHidden: boolean = true;
  filtered: boolean = false;
  faSlidersH = faSlidersH;
  public pager: any;
  public page: 1;
  jobs: any = [];
  applications: boolean = true;
  displayedColumns: string[] = ['companyLogo', 'jobName', 'companyName', 'action'];
  styleObject = {
    inputContainer: {},
    input: { fontSize: '2rem' },
    inputHeader: { fontSize: '2rem', borderBottom: '1px solid #888' },
    optionContainer: {
      backgroundColor: '#555',
      top: '3.3rem',
      boxShadow: '0px 1px 2px #aaa'
    },
    option: {
      fontSize: '2rem',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }
  };
  searchForm: FormGroup;
  defaultLimit = { max: '35', min: '0' };
  constructor(
    private applicantService: ApplicantService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
        console.log(this.jobs)
      },
      error => console.log(error)
    );

    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      this.filterHidden = true;
    });

    this.searchForm = this.formBuilder.group({
      jobtitle: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      companyName: ['', Validators.nullValidator]
    });
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobs() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.applicantService
      .getFilterAppliedJobs(val.jobtitle || '', val.industry || '', val.companyName || '', this.page || 1)
      .subscribe(data => {
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
      });

    this.filtered = true;
  }

  getServerData(page) {
    if (this.filtered) {
      var val = this.searchForm.value;
      this.applicantService
        .getFilterAppliedJobs(val.jobtitle || '', val.industry || '', val.companyName || '', page.pageIndex + 1 || 1)
        .subscribe(data => {
          this.jobs = data.jobs.rows;
          this.pager = data.jobs.pager;
        });
    } else {
      this.applicantService.getJobApplications(page.pageIndex + 1, page.pageSize).subscribe(
        success => {
          if (success.success == true) {
            this.jobs = success.jobs.rows;
            this.pager = success.jobs.pager;
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
    }
  }
}
