import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureJobListComponent } from './feature-job-list.component';

describe('FeatureJobListComponent', () => {
  let component: FeatureJobListComponent;
  let fixture: ComponentFixture<FeatureJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
