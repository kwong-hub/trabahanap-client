import { TestBed } from '@angular/core/testing';

import { CompanyCandidatesResolverService } from './company-candidates-resolver.service';

describe('CompanyCandidatesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyCandidatesResolverService = TestBed.get(CompanyCandidatesResolverService);
    expect(service).toBeTruthy();
  });
});
