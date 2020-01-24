import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IssueListEmployerComponent } from "./issue-list-employer.component";

describe("IssueListEmployerComponent", () => {
  let component: IssueListEmployerComponent;
  let fixture: ComponentFixture<IssueListEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueListEmployerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
