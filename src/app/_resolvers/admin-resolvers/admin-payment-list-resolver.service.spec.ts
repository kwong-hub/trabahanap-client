import { TestBed } from '@angular/core/testing';

import { AdminPaymentListResolverService } from './admin-payment-list-resolver.service';

describe('AdminPaymentListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPaymentListResolverService = TestBed.get(AdminPaymentListResolverService);
    expect(service).toBeTruthy();
  });
});
