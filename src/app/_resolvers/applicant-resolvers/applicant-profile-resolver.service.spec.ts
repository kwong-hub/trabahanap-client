import { TestBed } from "@angular/core/testing";

import { ApplicantProfileResolverService } from "./applicant-profile-resolver.service";

describe("ApplicantProfileResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ApplicantProfileResolverService = TestBed.get(
      ApplicantProfileResolverService
    );
    expect(service).toBeTruthy();
  });
});
