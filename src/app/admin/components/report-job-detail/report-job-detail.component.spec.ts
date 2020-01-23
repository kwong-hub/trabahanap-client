import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportJobDetailComponent } from './report-job-detail.component';

describe('ReportJobDetailComponent', () => {
  let component: ReportJobDetailComponent;
  let fixture: ComponentFixture<ReportJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
