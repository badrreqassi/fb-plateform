import { TestBed } from '@angular/core/testing';

import { JWTsecurityService } from './jwtsecurity.service';

describe('JWTsecurityService', () => {
  let service: JWTsecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTsecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
