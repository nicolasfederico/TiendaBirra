import { Test, TestingModule } from '@nestjs/testing';
import { CodigoDescuentoController } from './codigo-descuento.controller';

describe('CodigoDescuentoController', () => {
  let controller: CodigoDescuentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigoDescuentoController],
    }).compile();

    controller = module.get<CodigoDescuentoController>(CodigoDescuentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
