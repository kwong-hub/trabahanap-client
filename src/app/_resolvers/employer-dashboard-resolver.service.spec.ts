import { TestBed } from "@angular/core/testing";

import { EmployerDashboardResolverService } from "./employer-dashboard-resolver.service";

describe("EmployerDashboardResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: EmployerDashboardResolverService = TestBed.get(
      EmployerDashboardResolverService
    );
    expect(service).toBeTruthy();
  });
});
