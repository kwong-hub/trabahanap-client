import { TestBed } from '@angular/core/testing';

import { LocationDetailResolverService } from './location-detail-resolver.service';

describe('LocationDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationDetailResolverService = TestBed.get(LocationDetailResolverService);
    expect(service).toBeTruthy();
  });
});
