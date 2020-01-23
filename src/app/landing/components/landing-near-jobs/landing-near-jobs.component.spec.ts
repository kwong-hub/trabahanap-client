import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNearJobsComponent } from './landing-near-jobs.component';

describe('LandingNearJobsComponent', () => {
  let component: LandingNearJobsComponent;
  let fixture: ComponentFixture<LandingNearJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingNearJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingNearJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
