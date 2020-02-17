import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPaymentInformationComponent } from './employer-payment-information.component';

describe('EmployerPaymentInformationComponent', () => {
  let component: EmployerPaymentInformationComponent;
  let fixture: ComponentFixture<EmployerPaymentInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerPaymentInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPaymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
