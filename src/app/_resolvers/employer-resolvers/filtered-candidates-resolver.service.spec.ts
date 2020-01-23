import { TestBed } from '@angular/core/testing';

import { FilteredCandidatesResolverService } from './filtered-candidates-resolver.service';

describe('FilteredCandidatesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilteredCandidatesResolverService = TestBed.get(FilteredCandidatesResolverService);
    expect(service).toBeTruthy();
  });
});
