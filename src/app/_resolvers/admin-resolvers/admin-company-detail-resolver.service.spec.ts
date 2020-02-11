import { TestBed } from '@angular/core/testing';

import { AdminCompanyDetailResolverService } from './admin-company-detail-resolver.service';

describe('AdminCompanyDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminCompanyDetailResolverService = TestBed.get(AdminCompanyDetailResolverService);
    expect(service).toBeTruthy();
  });
});
