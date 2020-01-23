import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousJobsListComponent } from './anonymous-jobs-list.component';

describe('AnonymousJobsListComponent', () => {
  let component: AnonymousJobsListComponent;
  let fixture: ComponentFixture<AnonymousJobsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousJobsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
