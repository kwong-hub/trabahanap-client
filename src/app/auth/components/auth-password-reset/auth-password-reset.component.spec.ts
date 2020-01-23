import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPasswordResetComponent } from './auth-password-reset.component';

describe('AuthPasswordResetComponent', () => {
  let component: AuthPasswordResetComponent;
  let fixture: ComponentFixture<AuthPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
