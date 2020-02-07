import { TestBed } from '@angular/core/testing';

import { HeadLocationCheckResolverService } from './head-location-check-resolver.service';

describe('HeadLocationCheckResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadLocationCheckResolverService = TestBed.get(HeadLocationCheckResolverService);
    expect(service).toBeTruthy();
  });
});
