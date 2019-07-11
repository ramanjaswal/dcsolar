import { TestBed } from '@angular/core/testing';

import { MileageService } from './mileage.service';

describe('MileageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MileageService = TestBed.get(MileageService);
    expect(service).toBeTruthy();
  });
});
