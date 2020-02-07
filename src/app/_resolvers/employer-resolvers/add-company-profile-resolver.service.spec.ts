import { TestBed } from '@angular/core/testing';

import { AddCompanyProfileResolverService } from './add-company-profile-resolver.service';

describe('AddCompanyProfileResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCompanyProfileResolverService = TestBed.get(AddCompanyProfileResolverService);
    expect(service).toBeTruthy();
  });
});
