import { TestBed } from '@angular/core/testing';

import { JobListResolverService } from './job-list-resolver.service';

describe('JobListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobListResolverService = TestBed.get(JobListResolverService);
    expect(service).toBeTruthy();
  });
});
