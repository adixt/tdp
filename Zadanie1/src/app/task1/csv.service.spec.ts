import { TestBed, inject } from '@angular/core/testing';

import { CsvService } from './csv.service';

describe('Csv2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvService]
    });
  });

  it('should be created', inject([CsvService], (service: CsvService) => {
    expect(service).toBeTruthy();
  }));
});
