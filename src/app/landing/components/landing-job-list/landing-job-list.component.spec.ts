import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingJobListComponent } from './landing-job-list.component';

describe('LandingJobListComponent', () => {
  let component: LandingJobListComponent;
  let fixture: ComponentFixture<LandingJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
