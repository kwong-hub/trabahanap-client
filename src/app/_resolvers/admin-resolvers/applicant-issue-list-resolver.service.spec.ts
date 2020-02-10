import { TestBed } from '@angular/core/testing';

import { ApplicantIssueListResolverService } from './applicant-issue-list-resolver.service';

describe('ApplicantIssueListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantIssueListResolverService = TestBed.get(ApplicantIssueListResolverService);
    expect(service).toBeTruthy();
  });
});
