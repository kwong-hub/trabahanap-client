import { TestBed } from '@angular/core/testing';

import { SubscriptionResolverService } from './subscription-resolver.service';

describe('SubscriptionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionResolverService = TestBed.get(SubscriptionResolverService);
    expect(service).toBeTruthy();
  });
});
