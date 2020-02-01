import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStafferFormComponent } from './add-staffer-form.component';

describe('AddStafferFormComponent', () => {
  let component: AddStafferFormComponent;
  let fixture: ComponentFixture<AddStafferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStafferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStafferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
