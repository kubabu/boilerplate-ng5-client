import { TestBed, inject } from '@angular/core/testing';

import { CompletationOrdersService } from './completation-orders.service';

describe('CompletationOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompletationOrdersService],
    });
  });

  it('should be created', inject([CompletationOrdersService], (service: CompletationOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
