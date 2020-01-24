import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IssueListApplicantComponent } from "./issue-list-applicant.component";

describe("IssueListApplicantComponent", () => {
  let component: IssueListApplicantComponent;
  let fixture: ComponentFixture<IssueListApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueListApplicantComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
