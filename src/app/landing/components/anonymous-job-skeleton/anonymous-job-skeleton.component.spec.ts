import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AnonymousJobSkeletonComponent } from "./anonymous-job-skeleton.component";

describe("AnonymousJobSkeletonComponent", () => {
  let component: AnonymousJobSkeletonComponent;
  let fixture: ComponentFixture<AnonymousJobSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnonymousJobSkeletonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousJobSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
