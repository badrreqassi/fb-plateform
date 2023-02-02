import { TestBed } from '@angular/core/testing';

import { TokenInerceptorService } from './token-inerceptor.service';

describe('TokenInerceptorService', () => {
  let service: TokenInerceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInerceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
