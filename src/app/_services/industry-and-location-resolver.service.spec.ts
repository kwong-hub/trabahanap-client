import { TestBed } from '@angular/core/testing';

import { IndustryAndLocationResolverService } from './industry-and-location-resolver.service';

describe('IndustryAndLocationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndustryAndLocationResolverService = TestBed.get(IndustryAndLocationResolverService);
    expect(service).toBeTruthy();
  });
});
