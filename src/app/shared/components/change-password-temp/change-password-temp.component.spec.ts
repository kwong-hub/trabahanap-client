import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangePasswordTempComponent } from "./change-password-temp.component";

describe("ChangePasswordTempComponent", () => {
  let component: ChangePasswordTempComponent;
  let fixture: ComponentFixture<ChangePasswordTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordTempComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
