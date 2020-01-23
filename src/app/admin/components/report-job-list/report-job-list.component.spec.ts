import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportJobListComponent } from './report-job-list.component';

describe('ReportJobListComponent', () => {
  let component: ReportJobListComponent;
  let fixture: ComponentFixture<ReportJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
