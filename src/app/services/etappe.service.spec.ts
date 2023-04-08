import { TestBed } from '@angular/core/testing';

import { EtappeService } from './etappe.service';

describe('EtappeService', () => {
  let service: EtappeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtappeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
