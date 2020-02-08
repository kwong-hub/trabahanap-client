import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionFourComponent } from './home-section-four.component';

describe('HomeSectionFourComponent', () => {
  let component: HomeSectionFourComponent;
  let fixture: ComponentFixture<HomeSectionFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
