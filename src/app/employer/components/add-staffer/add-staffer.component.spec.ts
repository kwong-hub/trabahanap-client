import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddStafferComponent } from "./add-staffer.component";

describe("AddStafferComponent", () => {
  let component: AddStafferComponent;
  let fixture: ComponentFixture<AddStafferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddStafferComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStafferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
