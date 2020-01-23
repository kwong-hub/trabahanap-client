import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyLogoModalComponent } from './edit-company-logo-modal.component';

describe('EditCompanyLogoModalComponent', () => {
  let component: EditCompanyLogoModalComponent;
  let fixture: ComponentFixture<EditCompanyLogoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyLogoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyLogoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
