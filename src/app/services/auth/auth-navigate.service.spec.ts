import { TestBed, inject } from '@angular/core/testing';

import { AuthNavigateService } from './auth-navigate.service';

describe('AuthNavigateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthNavigateService]
    });
  });

  it('should be created', inject([AuthNavigateService], (service: AuthNavigateService) => {
    expect(service).toBeTruthy();
  }));
});
