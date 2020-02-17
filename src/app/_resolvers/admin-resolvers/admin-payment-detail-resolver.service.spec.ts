import { TestBed } from '@angular/core/testing';

import { AdminPaymentDetailResolverService } from './admin-payment-detail-resolver.service';

describe('AdminPaymentDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPaymentDetailResolverService = TestBed.get(AdminPaymentDetailResolverService);
    expect(service).toBeTruthy();
  });
});
