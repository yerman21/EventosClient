import { TestBed } from '@angular/core/testing';

import { AsistenciaEventoService } from './asistencia-evento.service';

describe('AsistenciaEventoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistenciaEventoService = TestBed.get(AsistenciaEventoService);
    expect(service).toBeTruthy();
  });
});
