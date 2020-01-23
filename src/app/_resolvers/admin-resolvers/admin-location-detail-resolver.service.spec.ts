import { TestBed } from '@angular/core/testing';

import { AdminLocationDetailResolverService } from './admin-location-detail-resolver.service';

describe('AdminLocationDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminLocationDetailResolverService = TestBed.get(AdminLocationDetailResolverService);
    expect(service).toBeTruthy();
  });
});
