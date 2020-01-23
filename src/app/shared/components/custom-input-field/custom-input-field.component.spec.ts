import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputFieldComponent } from './custom-input-field.component';

describe('CustomInputFieldComponent', () => {
  let component: CustomInputFieldComponent;
  let fixture: ComponentFixture<CustomInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomInputFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
