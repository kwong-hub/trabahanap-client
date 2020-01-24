import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SimpleFileInputComponent } from "./simple-file-input.component";

describe("SimpleFileInputComponent", () => {
  let component: SimpleFileInputComponent;
  let fixture: ComponentFixture<SimpleFileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleFileInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
