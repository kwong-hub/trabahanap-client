import { TestBed } from "@angular/core/testing";

import { SimpleJobSearchResolveService } from "./simple-job-search-resolve.service";

describe("SimpleJobSearchResolveService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SimpleJobSearchResolveService = TestBed.get(
      SimpleJobSearchResolveService
    );
    expect(service).toBeTruthy();
  });
});
