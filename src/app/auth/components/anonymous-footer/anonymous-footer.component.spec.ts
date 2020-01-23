import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousFooterComponent } from './anonymous-footer.component';

describe('AnonymousFooterComponent', () => {
  let component: AnonymousFooterComponent;
  let fixture: ComponentFixture<AnonymousFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
