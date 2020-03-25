import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanTypeComponent } from './add-plan-type.component';

describe('AddPlanTypeComponent', () => {
  let component: AddPlanTypeComponent;
  let fixture: ComponentFixture<AddPlanTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
