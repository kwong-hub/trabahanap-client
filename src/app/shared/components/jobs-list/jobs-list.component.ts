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
import { StateService } from '@app/_services/state.service';
import { LocationService } from '@app/_services/location.service';
import { Location } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';

let capitalize = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

@Component({
  selector: 'shared-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  @Input() resultJobs;
  searchForm: FormGroup;
  mobileSearchForm: FormGroup;
  desktopSearchForm: FormGroup;
  public jobs: Job[];
  public tempJobs: Job[] = [];
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
    { name: 'Below 18,000', value: '<18000' },
    { name: '18,000-25,000', value: '18000-25000' },
    { name: '25,001-40,000', value: '25001-40000' },
    { name: '40,001-60,000', value: '40001-60000' },
    { name: '60,001-80,000', value: '60001-80000' },
    { name: '>80,000', value: '>80000' }
  ];

  localCities = [
    'Makati',
    'Quezon City',
    'Manila',
    'San Juan',
    'Rizal',
    'Muntinlupa',
    'Pasig',
    'Bulacan',
    'Taguig',
    'Pasay',
    'Malabon',
    'Laguna',
    'Mandaluyong',
    'Caloocan',
    'Pangasinan',
    'Iloilo',
    'Pampanga',
    'Cebu City'
  ];

  localJobTitle = [
    'Office Staff',
    'Driver',
    'Sales Manager',
    'Data Encoder',
    'Warehouse Crew',
    'Service Crew',
    'Cashier',
    'Factory Worker',
    'Electrician',
    'Health Care',
    'Accounting',
    'Call Center',
    'Marketing',
    'Clerk',
    'Human Resource',
    'Construction',
    'Logistic',
    'Computers'
  ];
  educationAttainment = [];
  key = '';
  city = '';
  pramsKey;
  belowScroll: boolean = true;
  cityName;
  industryName;
  showLoader: boolean = false;
  salaryRangeValue = '';
  employmentTypeValue = '';
  queryValue = '';
  locationValue = '';

  showMoreOptions = {
    showMoreLocation: false,
    showMoreJobTitle: false,
    showMoreJobTypes: false,
    showMoreSalaryType: false
  };

  showNotFound = false;

  employmentType = [
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
  showMobileSearch = false;
  mobileSearchInfo = '';
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
    private authService: AuthenticationService,
    private stateService: StateService,
    private locationService: LocationService,
    private location: Location
  ) {}

  ngOnInit() {
    let path = this.location.path();
    let query = path.split('?')[1];
    if (query) {
      let queryValues = query.split('&');

      if (queryValues[0] && queryValues[0].split('=')[0] == 'key' && queryValues[0].split('=')[1]) {
        this.queryValue = capitalize(
          queryValues[0]
            .split('=')[1]
            .replace('%20', ' ')
            .toString()
        );
      }

      if (queryValues[1] && queryValues[1].split('=')[0] == 'city' && queryValues[1].split('=')[1]) {
        this.locationValue = capitalize(
          queryValues[1]
            .split('=')[1]
            .replace('%20', ' ')
            .toString()
        );
      }
    }
    if (this.stateService.jobs) {
      this.resultJobs = this.stateService.jobs;
    }
    // console.log(this.employmentType);
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.nullValidator],
      city: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      employmentType: ['', Validators.nullValidator],
      SalaryRange: ['', Validators.nullValidator],
      pwd: [false]
    });

    this.mobileSearchForm = this.formBuilder.group({
      query: [''],
      location: ['']
    });

    this.desktopSearchForm = this.formBuilder.group({
      query: [''],
      location: ['']
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

    if (this.resultJobs) {
      this.jobs = this.resultJobs.rows;
      this.page == this.resultJobs.pager.totalPages ? this.reachedPageEnd == true : '';
      this.pager = this.resultJobs.pager;
      this.page = this.resultJobs.pager.currentPage + 1;
      if (this.pager.totalItems == 0) {
        this.loadJobsForNoResults();
        this.belowScroll = false;
        this.reachedPageEnd = true;
      } else if (this.pager.totalItems <= 8) {
        this.belowScroll = false;
        this.reachedPageEnd = true;
      } else {
        this.loadJobs();
      }
    }

    this.getCities();

    // this.scrollToPosition();
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

  getCities() {
    this.locationService.getAllCities().subscribe(
      response => {
        const cities = response.cities;
        this.cities = [];
        cities.map(city => {
          this.cities.push({ name: city.cityName, value: city.id });
        });
      },
      error => console.log(error)
    );
  }

  mobileFilterChange(value, name) {
    if (name == 'city') {
      this.locationValue = value;
    } else if (name == 'salary') {
      this.salaryRangeValue = value;
    } else if (name == 'empType') {
      this.employmentTypeValue = value;
    } else if ((name = 'jobType')) {
      this.queryValue = value;
    }

    this.AdvancedSearch();
    // this.showMobileSearch = true;
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

  loadJobs(value = null) {
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
            this.queryValue || val.query || this.key || '',
            this.industryName || '',
            this.employmentTypeValue || val.employmentType || '',
            this.salaryRangeValue || val.SalaryRange || '',
            this.locationValue || this.cityName || this.city || '',
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

  loadJobsForNoResults() {
    if (this.tempJobs.length != 0) {
      return;
    }
    this.anonyService.advancedSearch('', '', '', '', '', 0, 1).subscribe(data => {
      if (data.jobs.rows.length > 0) {
        this.tempJobs.push(...data.jobs.rows);
        this.showNotFound = true;
      }
    });
  }

  hideNotFound() {
    this.showNotFound = false;
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
    this.updateUrl();
    this.anonyService
      .advancedSearch(
        this.queryValue || val.query || '',
        this.industryName || '',
        this.employmentTypeValue || val.employmentType || '',
        this.salaryRangeValue || val.SalaryRange || '',
        this.locationValue || this.cityName || '',
        val.pwd ? 1 : 0,
        1
      )
      .subscribe(data => {
        this.filterHidden = true;
        this.filtered = true;
        this.jobs = data.jobs.rows;
        if (this.jobs.length == 0) {
          this.loadJobsForNoResults();
        }
        if (data.jobs.pager.totalItems <= 8) {
          this.belowScroll = false;
          this.reachedPageEnd = true;
        } else {
          this.belowScroll = true;
          this.reachedPageEnd = false;
        }
        window.scrollTo(0, 0);
      });

    //this.searchForm.reset();
  }

  toggleAds($event) {
    this.adsModal = !this.adsModal;
  }

  ngOnDestroy() {
    // this.stateService.pushJobs({ rows: this.jobs, pager: this.pager });
    window.onscroll = null;
  }

  showMoreOptionsChange(value) {
    this.showMoreOptions[value] = !this.showMoreOptions[value];
  }

  mobileSearchToggle(event) {
    this.showMobileSearch = !this.showMobileSearch;
    this.mobileSearchInfo = '';
  }
  // scrollToPosition() {
  //   setTimeout(() => {
  //     if (this.stateService.jobs) {
  //       window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  //     }
  //   }, 100);
  // }

  mobileSearchSubmit() {
    let { query, location } = this.mobileSearchForm.value;
    if (!query && !location) {
      this.mobileSearchInfo = 'Fill search value first';
      return;
    }
    this.mobileSearchInfo = '';
    this.locationValue = '';
    this.employmentTypeValue = '';
    this.salaryRangeValue = '';

    this.queryValue = capitalize(query);
    this.locationValue = capitalize(location);
    this.AdvancedSearch();

    this.showMobileSearch = false;
  }

  decktopSearchSubmit() {
    let { query, location } = this.desktopSearchForm.value;
    // if (!query && !location) {
    //   this.mobileSearchInfo = 'Fill search value first';
    //   return;
    // }
    this.mobileSearchInfo = '';
    this.locationValue = '';
    this.employmentTypeValue = '';
    this.salaryRangeValue = '';

    this.queryValue = capitalize(query);
    this.locationValue = capitalize(location);
    this.AdvancedSearch();
  }

  updateUrl() {
    let path = this.location.path();
    let root = path.split('?')[0];
    let newSearch = `?key=${this.queryValue}&city=${this.locationValue}`;
    path = root.concat(newSearch);
    this.location.go(path);
  }

  getTopCities() {
    return this.localCities.slice(0, 4);
  }

  getRemainingCities() {
    return this.localCities.slice(4);
  }

  getTopSalRange() {
    return this.SalaryRange.slice(0, 2);
  }

  getRemainingSalRange() {
    return this.SalaryRange.slice(2);
  }

  getTopEmpType() {
    return this.employmentType.slice(0, 2);
  }

  getRemainingEmpType() {
    return this.employmentType.slice(2);
  }

  getTopJobTitle() {
    return this.localJobTitle.slice(0, 5);
  }

  getRemainingJobTitle() {
    return this.localJobTitle.slice(5);
  }
}
