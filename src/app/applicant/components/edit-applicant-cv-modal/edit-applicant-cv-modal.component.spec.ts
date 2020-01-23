import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplicantCvModalComponent } from './edit-applicant-cv-modal.component';

describe('EditApplicantCvModalComponent', () => {
  let component: EditApplicantCvModalComponent;
  let fixture: ComponentFixture<EditApplicantCvModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditApplicantCvModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApplicantCvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
