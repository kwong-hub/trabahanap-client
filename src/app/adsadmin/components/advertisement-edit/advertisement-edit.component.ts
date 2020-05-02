import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';
import _ from 'lodash';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-advertisement-edit',
  templateUrl: './advertisement-edit.component.html',
  styleUrls: ['./advertisement-edit.component.scss']
})
export class AdvertisementEditComponent implements OnInit {

  editAdsForm: FormGroup;
  submitStyle = { btn: { width: '100%' } };
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
  loading;
  submitted;
  formData = new FormData();
  AdsAdded: boolean;
  dates = {
    startDate: Date,
    endDate: Date
  };
  times = {
    adsStart: `00:00`,
    adsEnd: `23:59`
  };
  defaultLimit = { max: '50', min: '0' };
  ads: any;
  faCamera = faCamera

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,
    private _location: Location, private route: ActivatedRoute) { 
      this.route.data.subscribe(res => {
        let data = res.data;
        if(data.success) {
          this.ads = data.ads;
          console.log(this.ads)
        }else {
          this._location.back();
        }
      })
    }

  ngOnInit() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.editAdsForm = this.formBuilder.group({
      title: ['', Validators.required],
      adsEnd: ['', Validators.required],
      adsStart: ['', Validators.required],
      image: ['', Validators.required],
      websiteURL: ['', Validators.pattern(reg)],
      orientation: ['HORIZONTAL', Validators.required]
    });

    this.updateInputs();
  }

  dateChanged(value, name) {
    this.dates[`${name}`] = value;
    this.editAdsForm.controls[`${name}`].setValue(value);
  }

  timeChanged(value, name) {
    this.times[`${name}`] = value;
    let values = this.editAdsForm.controls[`${name}`].value + value;
    this.editAdsForm.controls[`${name}`].setValue(values);
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  radioChange(value) {
    this.editAdsForm.controls['orientation'].setValue(value);
  }
  
  updateInputs() {
    _.map(this.ads, (value, key) => {
      if (this.editAdsForm.controls[key] && key !== 'picture') {
        this.editAdsForm.controls[key].setValue(value);
      }
    });
    this.times['adsStart'] = moment(this.ads.adsStart).format('HH:mm')
    this.times['adsEnd'] = moment(this.ads.adsEnd).format('HH:mm')
    this.ads = {...this.ads, 
      adsStart: moment(this.ads.adsStart).format('YYYY-MM-DD'), 
      adsEnd: moment(this.ads.adsEnd).format('YYYY-MM-DD')
    }
    // this.checkbox.nativeElement. = true;
  }

  onEdit() {
    this.submitted = true;
    this.AdsAdded = false;
    if (this.editAdsForm.invalid) {
      return;
    }
    this.loading = true;
    let start = this.editAdsForm.controls['adsStart'].value + 'T' + this.times.adsStart;
    let end = this.editAdsForm.controls['adsEnd'].value + 'T' + this.times.adsEnd;
    this.editAdsForm.controls['adsStart'].setValue(start);
    this.editAdsForm.controls['adsEnd'].setValue(end);
    let val = this.editAdsForm.value;

    _.map(val, (value, key) => {
      if (key != 'image') {
        this.formData.append(key, value);
      }
    });

    this.adminService.addAdvertisement(this.formData).subscribe(
      data => {
        this.loading = false;
        if (data.success) {
          this.AdsAdded = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
