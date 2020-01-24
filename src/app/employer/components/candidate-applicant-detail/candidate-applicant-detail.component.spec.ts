import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CandidateApplicantDetailComponent } from "./candidate-applicant-detail.component";

describe("CandidateApplicantDetailComponent", () => {
  let component: CandidateApplicantDetailComponent;
  let fixture: ComponentFixture<CandidateApplicantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateApplicantDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateApplicantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
