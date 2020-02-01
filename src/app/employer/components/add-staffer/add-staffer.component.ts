import { OtherService } from '@app/_services/other.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { faCheckCircle, faExclamationCircle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-staffer',
  templateUrl: './add-staffer.component.html',
  styleUrls: ['./add-staffer.component.scss']
})
export class AddStafferComponent implements OnInit {
  submitted = false;
  stafferAdded = false;
  stafferError = false;
  previousStaffs = [];
  defaultLimit = { max: '30', min: '0' };
  numberRange = { max: '16', min: '10' };
  loading: boolean;
  faCheck = faCheckCircle;
  faExclamation = faExclamationCircle;
  faPlus = faPlus;
  faTimes = faTimes;
  isModalVisible: boolean;

  constructor(private Route: ActivatedRoute) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.previousStaffs = data.staffs;
      } else {
      }
    });
  }

  ngOnInit() {}

  toggleFormModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  addStaffToArray(data) {
    if (data.success) {
      this.isModalVisible = false;
      this.previousStaffs.unshift({ ...data.staff, emailVerified: 0 });
      this.stafferAdded = true;
    } else {
      this.stafferError = true;
    }
    setTimeout(() => {
      this.stafferAdded = false;
      this.stafferError = false;
    }, 4500);
  }
}
