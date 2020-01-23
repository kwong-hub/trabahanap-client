import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCandidateApplicantDetailComponent } from './filtered-candidate-applicant-detail.component';

describe('FilteredCandidateApplicantDetailComponent', () => {
  let component: FilteredCandidateApplicantDetailComponent;
  let fixture: ComponentFixture<FilteredCandidateApplicantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredCandidateApplicantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCandidateApplicantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
