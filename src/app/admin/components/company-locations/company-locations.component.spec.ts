import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLocationsComponent } from './company-locations.component';

describe('CompanyLocationsComponent', () => {
  let component: CompanyLocationsComponent;
  let fixture: ComponentFixture<CompanyLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
