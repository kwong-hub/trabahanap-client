import { TestBed } from '@angular/core/testing';

import { FeaturedCompanyListResolverService } from './featured-company-list-resolver.service';

describe('FeaturedCompanyListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturedCompanyListResolverService = TestBed.get(FeaturedCompanyListResolverService);
    expect(service).toBeTruthy();
  });
});
