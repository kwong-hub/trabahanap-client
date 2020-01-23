import { TestBed } from '@angular/core/testing';

import { AnonymousService } from './anonymous.service';

describe('AnonymousService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnonymousService = TestBed.get(AnonymousService);
    expect(service).toBeTruthy();
  });
});
