import { TestBed } from "@angular/core/testing";

import { CountryRegionIndustryResolverService } from "./country-region-industry-resolver.service";

describe("CountryRegionIndustryResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CountryRegionIndustryResolverService = TestBed.get(
      CountryRegionIndustryResolverService
    );
    expect(service).toBeTruthy();
  });
});
