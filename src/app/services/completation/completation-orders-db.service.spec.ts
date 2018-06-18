import { TestBed, inject } from '@angular/core/testing';

import { CompletationOrdersDbService } from './completation-orders-db.service';

describe('CompletationOrdersDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompletationOrdersDbService],
    });
  });

  it('should be created', inject([CompletationOrdersDbService], (service: CompletationOrdersDbService) => {
    expect(service).toBeTruthy();
  }));
});
