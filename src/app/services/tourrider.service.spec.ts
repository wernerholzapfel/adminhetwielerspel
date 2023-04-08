import { TestBed } from '@angular/core/testing';

import { TourriderService } from './tourrider.service';

describe('TourriderService', () => {
  let service: TourriderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourriderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
