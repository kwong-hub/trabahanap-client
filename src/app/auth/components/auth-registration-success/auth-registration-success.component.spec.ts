import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegistrationSuccessComponent } from './auth-registration-success.component';

describe('AuthRegistrationSuccessComponent', () => {
  let component: AuthRegistrationSuccessComponent;
  let fixture: ComponentFixture<AuthRegistrationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegistrationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
