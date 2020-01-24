import { TestBed } from "@angular/core/testing";

import { ReportByIdResolverService } from "./report-by-id-resolver.service";

describe("ReportByIdResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ReportByIdResolverService = TestBed.get(
      ReportByIdResolverService
    );
    expect(service).toBeTruthy();
  });
});
