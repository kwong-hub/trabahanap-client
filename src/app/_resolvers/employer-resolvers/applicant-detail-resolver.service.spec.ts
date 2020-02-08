import { TestBed } from '@angular/core/testing';

import { ApplicantDetailResolverService } from './applicant-detail-resolver.service';

describe('ApplicantDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantDetailResolverService = TestBed.get(ApplicantDetailResolverService);
    expect(service).toBeTruthy();
  });
});
