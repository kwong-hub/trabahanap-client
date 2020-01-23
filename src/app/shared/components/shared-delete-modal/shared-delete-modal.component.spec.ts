import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDeleteModalComponent } from './shared-delete-modal.component';

describe('SharedDeleteModalComponent', () => {
  let component: SharedDeleteModalComponent;
  let fixture: ComponentFixture<SharedDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
