import { TestBed, inject } from '@angular/core/testing';

import { PasswordErrorStateMatcher } from './password-validation.service';

describe('PasswordValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordErrorStateMatcher],
    });
  });

  it('should be created', inject([PasswordErrorStateMatcher], (service: PasswordErrorStateMatcher) => {
    expect(service).toBeTruthy();
  }));
});
