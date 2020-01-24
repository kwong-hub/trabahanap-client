import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditBusinessLicenseModalComponent } from "./edit-business-license-modal.component";

describe("EditBusinessLicenseModalComponent", () => {
  let component: EditBusinessLicenseModalComponent;
  let fixture: ComponentFixture<EditBusinessLicenseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditBusinessLicenseModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessLicenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
