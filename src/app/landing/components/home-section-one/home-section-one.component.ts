import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AnonymousService } from '@app/_services/anonymous.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { faMapMarker, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'landing-home-section-one',
  templateUrl: './home-section-one.component.html',
  styleUrls: ['./home-section-one.component.scss']
})
export class HomeSectionOneComponent implements OnInit {
  key = '';
  cities = [];
  cityName = '';
  faMarker = faMapMarkerAlt;
  faSearch = faSearch;
  CITIES$: Observable<any>;
  private citySearchTerms = new Subject<string>();
  showOptions: boolean;

  constructor(private router: Router, private anonyService: AnonymousService) {}

  ngOnInit() {
    document.addEventListener('click', () => {
      this.showOptions = false;
    });

    this.CITIES$ = this.citySearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.anonyService.searchCities(term))
    );
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

  selectCity(cityName): void {
    this.cityName = cityName;
    this.cities = [];
  }

  searchJobs() {
    this.router.navigate([`search/jobs`], {
      queryParams: { key: this.key, city: this.cityName }
    });
    return false;
  }
}
