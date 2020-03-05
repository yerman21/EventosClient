import { TestBed } from '@angular/core/testing';

import { UtilitarioService } from './utilitario.service';

describe('UtilitarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilitarioService = TestBed.get(UtilitarioService);
    expect(service).toBeTruthy();
  });
});
