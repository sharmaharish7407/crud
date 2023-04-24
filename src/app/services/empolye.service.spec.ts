import { TestBed } from '@angular/core/testing';

import { EmpolyeService } from './empolye.service';

describe('EmpolyeService', () => {
  let service: EmpolyeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpolyeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
