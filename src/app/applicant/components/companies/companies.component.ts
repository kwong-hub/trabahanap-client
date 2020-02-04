import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '@app/_services/applicant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSlidersH, faToolbox, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { JobService } from '@app/_services/jobs.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  searchForm: FormGroup;
  jobs: Array<object> = [];
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
  filterHidden: boolean = true;
  filtered: boolean = false;
  faSlidersH = faSlidersH;
  faToolbox = faToolbox;
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;
  
  public pager: any;
  public page: 1;
  defaultLimit = { max: '35', min: '0' };
  deleted: boolean;

  constructor(
    private applicantService: ApplicantService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private jobService: JobService
  ) {
    this.route.data.subscribe(
      data => {
        this.pager = data.jobs.pager;
        this.jobs = data.jobs.rows;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
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
      .getFilterSavedJobs(val.jobtitle || '', val.industry || '', val.companyName || '', this.page || 1)
      .subscribe(data => {
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
      });

    this.filtered = true;
  }

  getServerData(page) {
    this.applicantService.getSavedJobs(page.pageIndex + 1, page.pageSize).subscribe(
      data => {
        if (data.success == true) {
          this.jobs = data.jobs.rows;
          this.pager = data.jobs.pager;
        }
      },
      err => console.log(err)
    );
  }

  unbookmark(id) {
    this.deleted = false;
    this.jobService.toggleSaveJob(id).subscribe(
      data => {
        if(data.success) {
          this.deleted = true;
          this.getServerData({pageIndex: 0, pageSize: 5});
          this.jobs = this.jobs.filter(temp => {
            // @ts-ignore
            if (temp.id !== id) {
              return temp;
            }
          });
        }
      },
      error => {console.log(error)}
    )
  }
}
