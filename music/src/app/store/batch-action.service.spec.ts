import { TestBed } from '@angular/core/testing';

import { BatchActionService } from './batch-action.service';

describe('BatchActionService', () => {
  let service: BatchActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
