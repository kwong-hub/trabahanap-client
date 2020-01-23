import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantProfileComponent } from './add-applicant-profile.component';

describe('AddApplicantProfileComponent', () => {
  let component: AddApplicantProfileComponent;
  let fixture: ComponentFixture<AddApplicantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
