import { TestBed } from '@angular/core/testing';

import { DescriptionAndPrecautionService } from './description-and-precaution.service';

describe('DescriptionAndPrecautionService', () => {
  let service: DescriptionAndPrecautionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionAndPrecautionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
