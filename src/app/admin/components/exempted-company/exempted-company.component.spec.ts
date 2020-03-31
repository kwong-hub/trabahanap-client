import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptedCompanyComponent } from './exempted-company.component';

describe('ExemptedCompanyComponent', () => {
  let component: ExemptedCompanyComponent;
  let fixture: ComponentFixture<ExemptedCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptedCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
