import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTypesComponent } from './plan-types.component';

describe('PlanTypesComponent', () => {
  let component: PlanTypesComponent;
  let fixture: ComponentFixture<PlanTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
