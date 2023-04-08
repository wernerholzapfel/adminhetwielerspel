import { TestBed } from '@angular/core/testing';

import { PredictionScoreService } from './prediction-score.service';

describe('PredictionScoreService', () => {
  let service: PredictionScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictionScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
