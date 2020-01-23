import { TestBed } from '@angular/core/testing';

import { ApplicationListResolverService } from './application-list-resolver.service';

describe('ApplicationListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationListResolverService = TestBed.get(ApplicationListResolverService);
    expect(service).toBeTruthy();
  });
});
