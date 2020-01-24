import { TestBed } from "@angular/core/testing";

import { CompanyStaffResolverService } from "./company-staff-resolver.service";

describe("CompanyStaffResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CompanyStaffResolverService = TestBed.get(
      CompanyStaffResolverService
    );
    expect(service).toBeTruthy();
  });
});
