import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantReportComponent } from './applicant-report.component';

describe('ApplicantReportComponent', () => {
  let component: ApplicantReportComponent;
  let fixture: ComponentFixture<ApplicantReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
