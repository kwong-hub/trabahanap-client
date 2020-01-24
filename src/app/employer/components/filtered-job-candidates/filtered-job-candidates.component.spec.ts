import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FilteredJobCandidatesComponent } from "./filtered-job-candidates.component";

describe("FilteredJobCandidatesComponent", () => {
  let component: FilteredJobCandidatesComponent;
  let fixture: ComponentFixture<FilteredJobCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredJobCandidatesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredJobCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
