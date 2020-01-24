import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { _ } from "lodash";
import { ApplicantService } from "@app/_services/applicant.service";
import {
  faTimes,
  faEnvelope,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
// import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: "app-report-issue",
  templateUrl: "./report-issue.component.html",
  styleUrls: ["./report-issue.component.scss"]
  // animations: [
  //   trigger('removing', [
  //     state('deleted', style({
  //       opacity: 0,
  //       tranform: 'translateX(10rem)'
  //     })),
  //     transition('* => deleted', [ animate('1s')])
  //   ])
  // ]
})
export class ReportIssueComponent implements OnInit {
  issues = [];
  submitted;
  issueForm;
  faTimes = faTimes;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  formData = new FormData();

  selectStyle = {
    inputContainer: {},
    inputHeader: { fontSize: "1.5rem", borderBottom: "1px solid #888" },
    optionContainer: {
      backgroundColor: "#555",
      top: "3.3rem",
      boxShadow: "0px 1px 2px #aaa"
    },
    option: {
      fontSize: "1.5rem",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff"
    }
  };
  loading: boolean;
  issueSuccess: boolean;
  deleting: boolean;
  isModalVisible: boolean = false;
  selectedIssue: any;
  detailModal: boolean = false;
  deleteSuccess: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private applicantService: ApplicantService
  ) {}

  ngOnInit() {
    this.applicantService.getAllIssues().subscribe(
      data => {
        if (data.success) {
          this.issues = data.issues;
          // console.log(this.issues);
        }
      },
      error => {
        console.log(error);
      }
    );

    this.issueForm = this.formBuilder.group({
      issueReason: ["", Validators.required],
      issueType: ["", Validators.required],
      issueDescription: ["", Validators.required]
    });
  }

  // fileChanged(value, name){
  //   this.formData.append(name, value, value.name);
  // }

  selectChanged(value, name) {
    this.issueForm.controls[name].setValue(value);
  }

  openDetailModal(issue) {
    this.selectedIssue = issue;
    this.detailModal = true;
  }

  closeDetailModal() {
    this.detailModal = false;
    this.selectedIssue = null;
  }

  toggleFormModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  deleteIssue(id) {
    this.deleting = true;
    this.applicantService.deleteIssue(id).subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.deleteSuccess = true;
          this.deleting = false;
          this.issues = this.issues.filter(iss => {
            if (iss.id !== id) {
              return iss;
            }
          });
          setTimeout(() => {
            this.deleteSuccess = false;
          }, 4500);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addIssueToArray(issue) {
    this.isModalVisible = false;
    this.issues.unshift({ ...issue, issueResponseId: "" });
    this.issueSuccess = true;
    setTimeout(() => {
      this.issueSuccess = false;
    }, 4500);
  }
}
