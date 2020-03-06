import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCustomSubmitComponent } from './landing-custom-submit.component';

describe('LandingCustomSubmitComponent', () => {
  let component: LandingCustomSubmitComponent;
  let fixture: ComponentFixture<LandingCustomSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCustomSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCustomSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
