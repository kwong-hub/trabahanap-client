import { TestBed } from '@angular/core/testing';

import { CompanyLocationResolverService } from './company-location-resolver.service';

describe('CompanyLocationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyLocationResolverService = TestBed.get(CompanyLocationResolverService);
    expect(service).toBeTruthy();
  });
});
