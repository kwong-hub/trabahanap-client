import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomSubmitButtonComponent } from "./custom-submit-button.component";

describe("CustomSubmitButtonComponent", () => {
  let component: CustomSubmitButtonComponent;
  let fixture: ComponentFixture<CustomSubmitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSubmitButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
