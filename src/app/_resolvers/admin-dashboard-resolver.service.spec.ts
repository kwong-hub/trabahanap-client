import { TestBed } from '@angular/core/testing';

import { AdminDashboardResolverService } from './admin-dashboard-resolver.service';

describe('AdminDashboardResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminDashboardResolverService = TestBed.get(AdminDashboardResolverService);
    expect(service).toBeTruthy();
  });
});
