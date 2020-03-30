import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanTypeComponent } from './edit-plan-type.component';

describe('EditPlanTypeComponent', () => {
  let component: EditPlanTypeComponent;
  let fixture: ComponentFixture<EditPlanTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
