import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdCompanyComponent } from './pwd-company.component';

describe('PwdCompanyComponent', () => {
  let component: PwdCompanyComponent;
  let fixture: ComponentFixture<PwdCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwdCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
