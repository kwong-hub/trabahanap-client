import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsadminComponent } from './adsadmin.component';

describe('AdsadminComponent', () => {
  let component: AdsadminComponent;
  let fixture: ComponentFixture<AdsadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
