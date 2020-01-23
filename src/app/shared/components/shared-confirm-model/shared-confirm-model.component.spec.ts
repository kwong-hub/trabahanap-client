import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedConfirmModelComponent } from './shared-confirm-model.component';

describe('SharedConfirmModelComponent', () => {
  let component: SharedConfirmModelComponent;
  let fixture: ComponentFixture<SharedConfirmModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedConfirmModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedConfirmModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
