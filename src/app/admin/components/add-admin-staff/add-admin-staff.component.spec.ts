import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminStaffComponent } from './add-admin-staff.component';

describe('AddAdminStaffComponent', () => {
  let component: AddAdminStaffComponent;
  let fixture: ComponentFixture<AddAdminStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
