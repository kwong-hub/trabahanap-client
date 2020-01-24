import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeSectionTwoComponent } from "./home-section-two.component";

describe("HomeSectionTwoComponent", () => {
  let component: HomeSectionTwoComponent;
  let fixture: ComponentFixture<HomeSectionTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSectionTwoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
