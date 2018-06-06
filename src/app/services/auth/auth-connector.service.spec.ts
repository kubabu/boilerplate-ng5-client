import { TestBed, inject } from '@angular/core/testing';

import { AuthConnectorService } from './auth-connector.service';

describe('AuthConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthConnectorService],
    });
  });

  it('should be created', inject([AuthConnectorService], (service: AuthConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
