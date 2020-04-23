import { TestBed } from '@angular/core/testing';

import { ExemptResolverService } from './exempt-resolver.service';

describe('ExemptResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExemptResolverService = TestBed.get(ExemptResolverService);
    expect(service).toBeTruthy();
  });
});
