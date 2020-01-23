import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCandidatesListComponent } from './filtered-candidates-list.component';

describe('FilteredCandidatesListComponent', () => {
  let component: FilteredCandidatesListComponent;
  let fixture: ComponentFixture<FilteredCandidatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredCandidatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
