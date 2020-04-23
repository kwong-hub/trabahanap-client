import { Component, OnInit, NgZone } from '@angular/core';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { tileLayer, latLng, marker, icon, Point, LatLng } from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnonymousService } from '@app/_services/anonymous.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-near-jobs',
  templateUrl: './landing-near-jobs.component.html',
  styleUrls: ['./landing-near-jobs.component.scss']
})
export class LandingNearJobsComponent implements OnInit {
  faMarker = faMapMarkerAlt;
  faSearch = faSearch;
  ping;
  map: L.Map;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 15,
        attribution: '...'
      })
    ],
    zoom: 15,
    center: latLng(14.6042, 120.9822),
    attributionControl: false
  };
  latitude: any;
  longitude: any;
  locationTracked: boolean;

  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888' },
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
  radiuses = [
    { value: '3', name: '3Kms' },
    { value: '5', name: '5Km' },
    { value: '10', name: '10Kms' },
    { value: '15', name: '15Kms' }
  ];
  distance = 3;
  jobs;
  markers: L.Layer[] = [];
  searchForm: FormGroup;
  loading: boolean;

  constructor(
    private anonyService: AnonymousService,
    private router: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone
  ) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          let { latitude, longitude } = pos.coords;

          ({ latitude: this.latitude, longitude: this.longitude } = pos.coords);
          this.locationTracked = true;
          this.ping = marker([latitude, longitude], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png'
            }),
            draggable: true,
            autoPan: true,
            autoPanPadding: new Point(70, 70)
          });

          this.ping.on('dragend', e => {
            ({ lat: this.latitude, lng: this.longitude } = e.target._latlng);
          });

          this.ping.bindPopup(`<span>Your Location</span>`);
          this.options.center = latLng(latitude, longitude);
          this.map.panTo(new L.LatLng(latitude, longitude));

          this.anonyService.searchJobByProximity(this.latitude, this.longitude, this.distance, '').subscribe(
            data => {
              if (data.success) {
                this.pinMarkers(data.jobs);
              }
            },
            error => {
              console.log(error);
            }
          );
        },
        err => {
          let { latitude, longitude } = {
            latitude: 14.6042,
            longitude: 120.9822
          };
          ({ latitude: this.latitude, longitude: this.longitude } = {
            latitude: 14.6042,
            longitude: 120.9822
          });
          // console.log(err);
        }
      );
    }

    this.searchForm = this.formBuilder.group({
      key: [''],
      radius: ['3']
    });
  } // ngOnInit Ends here

  // get the reference to the map
  onMapReady(map: L.Map) {
    this.map = map;

    const provider = new OpenStreetMapProvider();
    
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoCompleteDelay: 300,
      autoClose: true,
      showMarker: false,
    });
    this.map.addControl(searchControl);
    searchControl.getContainer().onclick = e => { e.stopPropagation(); };
    this.map.on('geosearch/showlocation', (e) => {
      let { lat, lng } = e.marker._latlng;
      this.ping.setLatLng(new LatLng(lat, lng));
      ({ lat: this.latitude, lng: this.longitude } = e.marker._latlng);
    })
  }

  mapClicked(e) {
    let { lat, lng } = e.latlng;
    this.ping.setLatLng(new LatLng(lat, lng));
    ({ lat: this.latitude, lng: this.longitude } = e.latlng);
  }

  chooseRadius(rad) {
    this.searchForm.controls['radius'].setValue(rad);
  }

  // fetchJobsByKey(term: string): void {
  //   this.jobKeyTerms.next(term);
  //   this.JOBS$.subscribe(
  //     data => {
  //       if(data.success) {
  //         this.pinMarkers(data.jobs);
  //       }
  //     }
  //   )
  // }

  pinMarkers(jobs) {
    this.jobs = jobs;
    this.markers = [];
    this.jobs.forEach(job => {
      let newMarker = marker([job.latitude, job.longitude], {
        icon: icon({
          iconSize: [22, 38],
          iconAnchor: [13, 41],
          iconUrl: 'assets/img/marker-icon-2.png',
          shadowUrl: 'assets/marker-shadow.png'
        }),
        draggable: true
      });
      // newMarker.bindPopup(`<span>${job.jobTitle}</span>`);
      // newMarker.addEventListener('mouseover', (e) => {
      //   newMarker.togglePopup();
      // });
      newMarker.addEventListener('click', () => {
        this.zone.run(() => this.router.navigate([`jobs/details/${job.jobId}`]));
      });
      this.markers.push(newMarker);
    });
  }

  searchJobs() {
    let { key, radius } = this.searchForm.value;
    this.loading = true;
    this.anonyService.searchJobByProximity(this.latitude, this.longitude, radius, key).subscribe(data => {
      this.loading = false;
      if (data.success) {
        this.pinMarkers(data.jobs);
      }
    });
  }
}
