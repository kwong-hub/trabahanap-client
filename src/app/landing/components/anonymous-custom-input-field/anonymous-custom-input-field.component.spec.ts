import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AnonymousCustomInputFieldComponent } from "./anonymous-custom-input-field.component";

describe("AnonymousCustomInputFieldComponent", () => {
  let component: AnonymousCustomInputFieldComponent;
  let fixture: ComponentFixture<AnonymousCustomInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnonymousCustomInputFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousCustomInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
