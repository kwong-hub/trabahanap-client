import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { EmployerService } from "@app/_services/employer.service";
import {
  faPaperPlane,
  faEnvelope,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Location } from "@angular/common";

@Component({
  selector: "app-issue-list",
  templateUrl: "./issue-list.component.html",
  styleUrls: ["./issue-list.component.scss"]
})
export class IssueListComponent implements OnInit {
  issues;
  submitted;
  issueForm;
  options = [
    { name: "Credit Issue", value: "Credit Issue" },
    { name: "Job Post Issue", value: "Job Post Issue" },
    { name: "Marketing", value: "Marketing" },
    { name: "Partnership", value: "Partnership" },
    { name: "Payment Issue", value: "Payment Issue" },
    { name: "Sales and Ads", value: "Sales and Ads" },
    { name: "Technical Issue", value: "Technical Issue" },
    { name: "Website Issue", value: "Website Issue" },
    { name: "Others", value: "Others" }
  ];
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
    private employerService: EmployerService
  ) {}

  ngOnInit() {
    this.employerService.getAllIssues().subscribe(
      data => {
        if (data.success) {
          this.issues = data.issues;
          // console.log(this.issues[0]);
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
    this.employerService.deleteIssue(id).subscribe(
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
