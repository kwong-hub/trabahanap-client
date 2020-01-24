import { TestBed } from "@angular/core/testing";

import { CompanyApplicationsResolverService } from "./company-applications-resolver.service";

describe("CompanyApplicationsResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CompanyApplicationsResolverService = TestBed.get(
      CompanyApplicationsResolverService
    );
    expect(service).toBeTruthy();
  });
});
