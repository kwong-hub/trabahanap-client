import { TestBed } from "@angular/core/testing";

import { CompanyListResolverService } from "./company-list-resolver.service";

describe("CompanyListResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CompanyListResolverService = TestBed.get(
      CompanyListResolverService
    );
    expect(service).toBeTruthy();
  });
});
