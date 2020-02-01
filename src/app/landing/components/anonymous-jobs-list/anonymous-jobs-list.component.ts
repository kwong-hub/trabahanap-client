import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Job } from '@app/_models/Job';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { JobService } from '@app/_services/jobs.service';
import { AnonymousService } from '@app/_services/anonymous.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: 'app-anonymous-jobs-list',
  templateUrl: './anonymous-jobs-list.component.html',
  styleUrls: ['./anonymous-jobs-list.component.scss']
})
export class AnonymousJobsListComponent implements OnInit {
  @Input() resultJobs;
  searchForm: FormGroup;
  public jobs: Job[];
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  savedJobIds: string[] = [];
  faSlidersH = faSlidersH;
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
  educationAttainment = [];
  key = '';
  city = '';
  pramsKey;
  belowScroll: boolean = true;
  cityName;
  industryName;
  showLoader: boolean = false;

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
    inputHeader: {
      backgroundColor: '#fff',
      fontSize: '1.5rem',
      border: '1px solid #888'
    },
    optionContainer: {
      backgroundColor: '#555',
      top: '3.4rem',
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
  //scrolled = new EventEmitter();

  @ViewChild('anchor', { static: false }) anchor: ElementRef<HTMLElement>;
  @ViewChild('jobsListAnchor', { static: false }) jobsListAnchor: ElementRef<HTMLElement>;
  openActions: {};
  compId: any;
  adsModal: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private JobsService: JobService,
    private anonyService: AnonymousService,
    private route: ActivatedRoute,
    private host: ElementRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // console.log(this.employmentType);
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.nullValidator],
      city: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      employmentType: ['', Validators.nullValidator],
      SalaryRange: ['', Validators.nullValidator],
      pwd: [false]
    });

    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      this.openActions = {};
      this.filterHidden = true;
    });

    this.CITIES$ = this.citySearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.anonyService.searchCities(term))
    );

    this.INDUSTRIES$ = this.industrySearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.anonyService.searchIndustries(term))
    );

    let auth = this.authService.currentUserValue;
    this.route.queryParamMap.subscribe(params => {
      this.pramsKey = { ...params };
      this.key = this.pramsKey.params.key;
      this.city = this.pramsKey.params.city;
    });

    if (auth === null || !auth.hasFinishedProfile) {
      if (this.resultJobs) {
        this.jobs = this.resultJobs.rows;
        this.page == this.resultJobs.pager.totalPages ? this.reachedPageEnd == true : '';
        this.pager = this.resultJobs.pager;
        this.page = this.resultJobs.pager.currentPage + 1;
        if (this.pager.totalItems < 8) {
          this.reachedPageEnd = true;
          this.belowScroll = false;
        } else {
          this.loadJobs();
        }
      }
    } else {
      this.JobsService.getApplicantSavedJobs().subscribe(
        data => {
          if (data.success && data.jobs) {
            this.getSavedJobIds(data.jobs);
          }

          if (this.resultJobs) {
            this.jobs = this.resultJobs.rows;
            this.page == this.resultJobs.pager.totalPages ? this.reachedPageEnd == true : '';
            this.pager = this.resultJobs.pager;
            this.page = this.resultJobs.pager.currentPage + 1;
            if (this.pager.totalItems < 8) {
              this.belowScroll = false;
              this.reachedPageEnd = true;
            } else {
              this.loadJobs();
            }
          }
        },
        err => console.log(err)
      );
    }
  }

  fetchCities(term: string): void {
    if (term === '') {
      this.cities = [];
      return;
    }

    this.citySearchTerms.next(term);
    this.CITIES$.subscribe(data => {
      this.cities = data.cities;
      this.showOptions = true;
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

  selectCity(cityName): void {
    this.cityName = cityName;
    this.cities = [];
  }

  selectIndustry(industryName) {
    this.industryName = industryName;
    this, (this.industries = []);
  }

  getSavedJobIds(jobs) {
    jobs.map(job => {
      this.savedJobIds.push(job.id);
    });
  }

  loadJobs() {
    let elementPositionForScroll = 0;
    window.onscroll = () => {
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor ? this.anchor.nativeElement.offsetTop : 0;
      if (elementPosition > elementPositionForScroll) {
        if (elementPositionForScroll > 0) {
          window.scrollTo(0, elementPosition - elementPosition / (this.jobs.length / 8));
        }
        elementPositionForScroll = elementPosition;
      }
      if (elementPosition > bottomPosition) {
        this.showLoader = true;
        this.shouldLoad = true;
      }
      if (bottomPosition > elementPosition && this.shouldLoad && !this.reachedPageEnd) {
        this.shouldLoad = false;
        this.showLoader = true;
        var val = this.searchForm.value;

        this.anonyService
          .advancedSearch(
            val.query || this.key || '',
            this.industryName || '',
            val.employmentType || '',
            val.SalaryRange || '',
            this.cityName || this.city || '',
            val.pwd ? 1 : 0,
            this.page
          )
          .subscribe(data => {
            if (this.jobs) {
              this.shouldLoad = data.jobs.rows.length > 0 ? true : false;

              if (data.jobs.rows.length > 0) {
                this.jobs.push(...data.jobs.rows);
                // this.shouldLoad = true;
                this.page = data.jobs.pager.currentPage + 1;
                this.pager = data.jobs.pager;
                if (data.jobs.pager.totalPages == data.jobs.pager.currentPage) {
                  this.reachedPageEnd = true;
                  this.belowScroll = false;
                }
              }
            }
          });
      }
    };
  }

  checkJobBookmarked(jobId) {
    return this.savedJobIds.includes(jobId);
  }

  datePickerChanged($event) {}

  onSubmit() {
    return false;
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }
  customValueChanged(value, name) {
    this.searchForm.controls[name].setValue(value);
  }

  AdvancedSearch() {
    var val = this.searchForm.value;

    this.anonyService
      .advancedSearch(
        val.query || '',
        this.industryName || '',
        val.employmentType || '',
        val.SalaryRange || '',
        this.cityName || '',
        val.pwd ? 1 : 0,
        1
      )
      .subscribe(data => {
        this.filterHidden = true;
        this.filtered = true;
        this.jobs = data.jobs.rows;
        if (data.jobs.pager.totalItems < 8) {
          this.belowScroll = false;
          this.reachedPageEnd = true;
        }
        window.scrollTo(0, 0);
      });

    //this.searchForm.reset();
  }

  toggleAds($event) {
    this.adsModal = !this.adsModal;
  }
}
