import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationStoreService } from './auth-store.service';

describe('AuthStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationStoreService],
    });
  });

  it('should be created', inject([AuthenticationStoreService], (service: AuthenticationStoreService) => {
    expect(service).toBeTruthy();
  }));
});
