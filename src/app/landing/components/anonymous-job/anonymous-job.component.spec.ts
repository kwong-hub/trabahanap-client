import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousJobComponent } from './anonymous-job.component';

describe('AnonymousJobComponent', () => {
  let component: AnonymousJobComponent;
  let fixture: ComponentFixture<AnonymousJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
