import { TestBed } from '@angular/core/testing';

import { OportunidadeService } from './oportunidade.service';

describe('OportunidadeService', () => {
  let service: OportunidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OportunidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
