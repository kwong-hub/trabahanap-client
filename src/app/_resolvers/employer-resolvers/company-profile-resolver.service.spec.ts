import { TestBed } from "@angular/core/testing";

import { CompanyProfileResolverService } from "./company-profile-resolver.service";

describe("CompanyProfileResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CompanyProfileResolverService = TestBed.get(
      CompanyProfileResolverService
    );
    expect(service).toBeTruthy();
  });
});
