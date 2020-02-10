import { TestBed } from '@angular/core/testing';

import { AdminIssueDashboardResolverService } from './admin-issue-dashboard-resolver.service';

describe('AdminIssueDashboardResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminIssueDashboardResolverService = TestBed.get(AdminIssueDashboardResolverService);
    expect(service).toBeTruthy();
  });
});
