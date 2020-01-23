import { TestBed } from '@angular/core/testing';

import { AdminStaffsListResolverService } from './admin-staffs-list-resolver.service';

describe('AdminStaffsListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminStaffsListResolverService = TestBed.get(AdminStaffsListResolverService);
    expect(service).toBeTruthy();
  });
});
