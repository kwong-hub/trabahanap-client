import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddEmployerJobComponent } from "./add-employer-job.component";

describe("AddEmployerJobComponent", () => {
  let component: AddEmployerJobComponent;
  let fixture: ComponentFixture<AddEmployerJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmployerJobComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployerJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
