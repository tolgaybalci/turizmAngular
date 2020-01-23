import { TestBed } from '@angular/core/testing';

import { PojoService } from './pojo.service';

describe('PojoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PojoService = TestBed.get(PojoService);
    expect(service).toBeTruthy();
  });
});
