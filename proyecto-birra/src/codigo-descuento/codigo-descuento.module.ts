import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaController } from 'src/factura/factura.controller';
import { Factura } from 'src/factura/factura.entity';
import { FacturaService } from 'src/factura/factura.service';
import Usuario from 'src/usuario/usuario.entity';
import { CodigoDescuentoController } from './codigo-descuento.controller';
import { CodigoDescuentoService } from './codigo-descuento.service';
import { CodigoDescuento } from './codigoDescuento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodigoDescuento,Usuario,Factura])
    ],
    controllers: [CodigoDescuentoController,FacturaController],
  providers: [CodigoDescuentoService,FacturaService]
})
export class CodigoDescuentoModule {}
