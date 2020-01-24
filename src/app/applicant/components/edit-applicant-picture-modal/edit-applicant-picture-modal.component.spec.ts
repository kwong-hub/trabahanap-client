import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditApplicantPictureModalComponent } from "./edit-applicant-picture-modal.component";

describe("EditApplicantPictureModalComponent", () => {
  let component: EditApplicantPictureModalComponent;
  let fixture: ComponentFixture<EditApplicantPictureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditApplicantPictureModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApplicantPictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
