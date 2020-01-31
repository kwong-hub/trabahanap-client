import { TestBed } from '@angular/core/testing';

import { ApplicantDashboardResolverService } from './applicant-dashboard-resolver.service';

describe('ApplicantDashboardResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantDashboardResolverService = TestBed.get(ApplicantDashboardResolverService);
    expect(service).toBeTruthy();
  });
});
