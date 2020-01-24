import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FeatureJobComponent } from "./feature-job.component";

describe("FeatureJobComponent", () => {
  let component: FeatureJobComponent;
  let fixture: ComponentFixture<FeatureJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureJobComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
