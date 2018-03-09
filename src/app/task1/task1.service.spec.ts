import { TestBed, inject } from '@angular/core/testing';

import { Task1Service } from './task1.service';

describe('Task1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Task1Service]
    });
  });

  it('should be created', inject([Task1Service], (service: Task1Service) => {
    expect(service).toBeTruthy();
  }));
});
