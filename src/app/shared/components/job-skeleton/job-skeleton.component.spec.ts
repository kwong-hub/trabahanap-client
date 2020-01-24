import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { JobSkeletonComponent } from "./job-skeleton.component";

describe("JobSkeletonComponent", () => {
  let component: JobSkeletonComponent;
  let fixture: ComponentFixture<JobSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobSkeletonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
