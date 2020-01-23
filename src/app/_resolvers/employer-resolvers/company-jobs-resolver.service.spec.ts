import { TestBed } from "@angular/core/testing";

import { CompanyJobsResolverService } from "./company-jobs-resolver.service";

describe("CompanyJobsResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CompanyJobsResolverService = TestBed.get(
      CompanyJobsResolverService
    );
    expect(service).toBeTruthy();
  });
});
