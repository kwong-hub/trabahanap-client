import { TestBed } from '@angular/core/testing';

import { EditPaymentTypeResolverService } from './edit-payment-type-resolver.service';

describe('EditPaymentTypeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditPaymentTypeResolverService = TestBed.get(EditPaymentTypeResolverService);
    expect(service).toBeTruthy();
  });
});
