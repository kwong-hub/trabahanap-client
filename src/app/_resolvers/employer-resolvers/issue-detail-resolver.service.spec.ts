import { TestBed } from "@angular/core/testing";

import { IssueDetailResolverService } from "./issue-detail-resolver.service";

describe("IssueDetailResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: IssueDetailResolverService = TestBed.get(
      IssueDetailResolverService
    );
    expect(service).toBeTruthy();
  });
});
