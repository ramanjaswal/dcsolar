import { TestBed } from '@angular/core/testing';

import { ClockinService } from './clockin.service';

describe('ClockinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClockinService = TestBed.get(ClockinService);
    expect(service).toBeTruthy();
  });
});
