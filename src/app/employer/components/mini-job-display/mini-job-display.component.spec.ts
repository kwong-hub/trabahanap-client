import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniJobDisplayComponent } from './mini-job-display.component';

describe('MiniJobDisplayComponent', () => {
  let component: MiniJobDisplayComponent;
  let fixture: ComponentFixture<MiniJobDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniJobDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniJobDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
