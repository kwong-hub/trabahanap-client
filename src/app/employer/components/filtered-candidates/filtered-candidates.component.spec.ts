import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FilteredCandidatesComponent } from "./filtered-candidates.component";

describe("FilteredCandidatesComponent", () => {
  let component: FilteredCandidatesComponent;
  let fixture: ComponentFixture<FilteredCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredCandidatesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
