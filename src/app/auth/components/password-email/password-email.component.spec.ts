import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEmailComponent } from './password-email.component';

describe('PasswordEmailComponent', () => {
  let component: PasswordEmailComponent;
  let fixture: ComponentFixture<PasswordEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
