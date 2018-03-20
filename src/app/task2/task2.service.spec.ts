import { TestBed, inject } from '@angular/core/testing';

import { Task2Service } from './task2.service';

describe('Task2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Task2Service]
    });
  });

  it('should be created', inject([Task2Service], (service: Task2Service) => {
    expect(service).toBeTruthy();
  }));
});
