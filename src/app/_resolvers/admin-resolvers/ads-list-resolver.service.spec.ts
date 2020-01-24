import { TestBed } from '@angular/core/testing';

import { AdsListResolverService } from './ads-list-resolver.service';

describe('AdsListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdsListResolverService = TestBed.get(AdsListResolverService);
    expect(service).toBeTruthy();
  });
});
