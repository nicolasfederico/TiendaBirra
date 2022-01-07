import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from 'src/factura/factura.entity';
import { CodigoDescuentoController } from './codigo-descuento.controller';
import { CodigoDescuentoService } from './codigo-descuento.service';
import { CodigoDescuento } from './codigoDescuento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodigoDescuento,Factura])],
    controllers: [CodigoDescuentoController],
  providers: [CodigoDescuentoService]
})
export class CodigoDescuentoModule {}
