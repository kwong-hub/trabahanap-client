import { TestBed } from '@angular/core/testing';

import { AdminEmployerPaymentResolverService } from './admin-employer-payment-resolver.service';

describe('AdminEmployerPaymentResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminEmployerPaymentResolverService = TestBed.get(AdminEmployerPaymentResolverService);
    expect(service).toBeTruthy();
  });
});
