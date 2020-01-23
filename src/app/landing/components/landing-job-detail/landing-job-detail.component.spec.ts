import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingJobDetailComponent } from './landing-job-detail.component';

describe('LandingJobDetailComponent', () => {
  let component: LandingJobDetailComponent;
  let fixture: ComponentFixture<LandingJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
