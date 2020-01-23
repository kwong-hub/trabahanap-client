import { TestBed } from '@angular/core/testing';

import { ApplicantSavedApplicationsResolverService } from './applicant-saved-applications-resolver.service';

describe('ApplicantSavedApplicationsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantSavedApplicationsResolverService = TestBed.get(ApplicantSavedApplicationsResolverService);
    expect(service).toBeTruthy();
  });
});
