import { TestBed } from '@angular/core/testing';

import { FetchAdByIdResolverService } from './fetch-ad-by-id-resolver.service';

describe('FetchAdByIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchAdByIdResolverService = TestBed.get(FetchAdByIdResolverService);
    expect(service).toBeTruthy();
  });
});
