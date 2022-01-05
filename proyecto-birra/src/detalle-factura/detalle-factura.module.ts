import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaController } from 'src/factura/factura.controller';
import { Factura } from 'src/factura/factura.entity';
import { FacturaService } from 'src/factura/factura.service';
import { ProductoController } from 'src/producto/producto.controller';
import { Producto } from 'src/producto/producto.entity';
import { ProductoService } from 'src/producto/producto.service';
import Usuario from 'src/usuario/usuario.entity';
import { DetalleFacturaController } from './detalle-factura.controller';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFactura } from './detalleFactura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleFactura,Factura,Producto,Usuario])
    ],
  controllers: [DetalleFacturaController,FacturaController,ProductoController],
  providers: [DetalleFacturaService,FacturaService,ProductoService]
})
export class DetalleFacturaModule {}
