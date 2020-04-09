import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPlanComponent } from './employer-plan.component';

describe('EmployerPlanComponent', () => {
  let component: EmployerPlanComponent;
  let fixture: ComponentFixture<EmployerPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
