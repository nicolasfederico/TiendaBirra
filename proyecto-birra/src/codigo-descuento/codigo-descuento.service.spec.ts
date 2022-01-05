import { Test, TestingModule } from '@nestjs/testing';
import { CodigoDescuentoService } from './codigo-descuento.service';

describe('CodigoDescuentoService', () => {
  let service: CodigoDescuentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoDescuentoService],
    }).compile();

    service = module.get<CodigoDescuentoService>(CodigoDescuentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
