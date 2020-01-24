import { TestBed } from "@angular/core/testing";

import { IssueByIdResolverService } from "./issue-by-id-resolver.service";

describe("IssueByIdResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: IssueByIdResolverService = TestBed.get(
      IssueByIdResolverService
    );
    expect(service).toBeTruthy();
  });
});
