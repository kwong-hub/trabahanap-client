import { Component, OnInit } from '@angular/core';
import { Job } from '@app/_models/Job';
import { JobService } from '@app/_services/jobs.service';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '@app/_services/state.service';
import { faSlidersH, faEdit, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AnonymousService } from '@app/_services/anonymous.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {
  public jobs: Job[];
  public pager: any;
  public page: 1;
  faSlidersH = faSlidersH;
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  searchForm: FormGroup;
  filterHidden = true;
  filtered = false;
  cities = [];
  query;
  employmentTypeName;
  salaryRangeName;
  industries = [];
  SalaryRange = [
    { name: 'All', value: '' },
    { name: 'Below 18,000', value: '<18000' },
    { name: '18,000-25,000', value: '18000-25000' },
    { name: '25,001-40,000', value: '25001-40000' },
    { name: '40,001-60,000', value: '40001-60000' },
    { name: '60,001-80,000', value: '60001-80000' },
    { name: '>80,000', value: '>80000' }
  ];

  cityName = '';
  industryName = '';

  employmentType = [
    { name: 'All', value: '' },
    { name: 'Part Time', value: 'Part-Time' },
    { name: 'Full Time', value: 'Full-Time' },
    { name: 'Project Based', value: 'Project-Based' },
    { name: 'Permanent', value: 'PERMANENT' },
    { name: 'Temporary', value: 'TEMPORARY' },
    { name: 'Internship/OJT', value: 'INTERNSHIP/OJT' },
    { name: 'Freelance', value: 'Freelance' }
  ];

  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', border: '1px solid #888' },
    optionContainer: {
      backgroundColor: '#555',
      top: '3.3rem',
      boxShadow: '0px 1px 2px #aaa'
    },
    option: {
      fontSize: '1.5rem',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }
  };
  CITIES$: Observable<any>;
  INDUSTRIES$: Observable<any>;

  private citySearchTerms = new Subject<string>();
  private industrySearchTerms = new Subject<string>();
  showOptions: boolean;
  showOptionsIndustry: boolean;

  displayedColumns: string[] = ['jobTitle', 'industry', 'education', 'salaryRange', 'action'];
  isLogoEditModalOpen: boolean = false;
  deletedId: any;
  defaultLimit = { max: '50', min: '0' };
  constructor(
    private adminService: AdminService,
    private anonyService: AnonymousService,
    private JobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
      } else {
      }
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      employmentType: ['', Validators.nullValidator],
      SalaryRange: ['', Validators.nullValidator]
    });

    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      // this.openActions = {};
      this.filterHidden = true;
    });

    this.INDUSTRIES$ = this.industrySearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.anonyService.searchIndustries(term))
    );

    // this.JobService.getAllJobs(1)
    //   .subscribe(
    //     data => {
    //       if (data.success) {
    //         this.jobs = data.jobs.rows;
    //         this.pager = data.jobs.pager;
    //         //this.jobs = data.jobs;
    //       }
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   )
  }

  deleteJob($event) {
    if ($event) {
      this.adminService.deleteEmployerJob(this.deletedId).subscribe(data => {
        if (data.success) {
          this.jobs = this.jobs.filter(item => {
            if (item.jobId !== data.job.id) {
              return item;
            }
          });
          this.pager.totalItems = this.pager.totalItems - 1;
        }
      });
    }
  }

  toggleJob($event) {
    this.isLogoEditModalOpen = !this.isLogoEditModalOpen;
    this.deletedId = $event;
  }

  getServerData(page) {
    if (this.filtered) {
      var val = this.searchForm.value;
      this.adminService
        .getFilterJobs(
          val.query,
          this.industryName,
          val.employmentType || '',
          val.salaryRange || '',
          page.pageIndex + 1,
          page.pageSize
        )
        .subscribe(data => {
          this.jobs = data.jobs.rows;
          this.pager = data.jobs.pager;
        });
    } else {
      this.adminService.getJobs(page.pageIndex + 1, page.pageSize).subscribe(
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

  editJob(companyProfileId, id) {
    // this.router.navigate([
    //   `/employers/jobs/${companyProfileId}/add/${id}`
    // ]);
    this.router.navigate([`../employers/jobs/${companyProfileId}/add/${id}`], {
      relativeTo: this.route
    });
  }

  fetchIndustries(term: string): void {
    if (term === '') {
      this.industries = [];
      return;
    }

    this.industrySearchTerms.next(term);
    this.INDUSTRIES$.subscribe(data => {
      this.industries = data.industries;
      this.showOptionsIndustry = true;
    });
  }
  selectIndustry(industryName) {
    this.industryName = industryName;
    this, (this.industries = []);
  }

  customValueChanged(value, name) {
    this.searchForm.controls[name].setValue(value);
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobs() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.adminService
      .getFilterJobs(
        val.query,
        this.industryName || '',
        val.employmentType || '',
        val.SalaryRange || '',
        this.page || 1,
        8
      )
      .subscribe(data => {
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
      });

    this.filtered = true;
  }
}
