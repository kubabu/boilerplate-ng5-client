import { TestBed, inject } from '@angular/core/testing';

import { SidebarMappingService } from './sidebar-mapping.service';

describe('SidebarMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarMappingService]
    });
  });

  it('should be created', inject([SidebarMappingService], (service: SidebarMappingService) => {
    expect(service).toBeTruthy();
  }));
});
