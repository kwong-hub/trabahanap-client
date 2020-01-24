import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { EmployerService } from "@app/_services/employer.service";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Router } from "@angular/router";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AdminService } from "@app/_services/admin.service";

@Component({
  selector: "app-shared-delete-modal",
  templateUrl: "./shared-delete-modal.component.html",
  styleUrls: ["./shared-delete-modal.component.scss"]
})
export class SharedDeleteModalComponent implements OnInit {
  faTimes = faTimes;
  updateLogoForm: FormGroup;
  formData = new FormData();
  submited = false;
  showEditLoader = false;

  @Input() isModalOpen: boolean;
  @Input() jobId: any;
  @Output() closeModalEvent = new EventEmitter();
  @Output() deletedJob = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  closeModal() {
    this.closeModalEvent.emit(false);
  }
  deleteJob() {
    this.submited = true;
    this.deletedJob.emit(true);
    this.closeModal();
  }
}
