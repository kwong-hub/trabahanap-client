import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDetailContainerComponent } from './issue-detail-container.component';

describe('IssueDetailContainerComponent', () => {
  let component: IssueDetailContainerComponent;
  let fixture: ComponentFixture<IssueDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
