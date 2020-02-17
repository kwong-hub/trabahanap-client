import { TestBed } from '@angular/core/testing';

import { AdminReportResolverService } from './admin-report-resolver.service';

describe('AdminReportResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminReportResolverService = TestBed.get(AdminReportResolverService);
    expect(service).toBeTruthy();
  });
});
