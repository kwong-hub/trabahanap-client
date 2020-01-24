import { TestBed } from "@angular/core/testing";

import { ApplicantListResolverService } from "./applicant-list-resolver.service";

describe("ApplicantListResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ApplicantListResolverService = TestBed.get(
      ApplicantListResolverService
    );
    expect(service).toBeTruthy();
  });
});
