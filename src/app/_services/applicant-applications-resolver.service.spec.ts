import { TestBed } from "@angular/core/testing";

import { ApplicantApplicationsResolverService } from "./applicant-applications-resolver.service";

describe("ApplicantApplicationsResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ApplicantApplicationsResolverService = TestBed.get(
      ApplicantApplicationsResolverService
    );
    expect(service).toBeTruthy();
  });
});
