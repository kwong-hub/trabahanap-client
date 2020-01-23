import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLoginTempComponent } from './shared-login-temp.component';

describe('SharedLoginTempComponent', () => {
  let component: SharedLoginTempComponent;
  let fixture: ComponentFixture<SharedLoginTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedLoginTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLoginTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
