import { TestBed } from '@angular/core/testing';

import { EmployerIssueListResolverService } from './employer-issue-list-resolver.service';

describe('EmployerIssueListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployerIssueListResolverService = TestBed.get(EmployerIssueListResolverService);
    expect(service).toBeTruthy();
  });
});
