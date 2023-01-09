import { TestBed } from '@angular/core/testing';

import { GridGenerationService } from './grid-generation.service';

describe('GridGeneratorServiceService', () => {
  let service: GridGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
