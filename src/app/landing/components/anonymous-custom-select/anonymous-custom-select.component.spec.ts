import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousCustomSelectComponent } from './anonymous-custom-select.component';

describe('AnonymousCustomSelectComponent', () => {
  let component: AnonymousCustomSelectComponent;
  let fixture: ComponentFixture<AnonymousCustomSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousCustomSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
