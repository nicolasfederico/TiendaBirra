import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { CodigoDescuentoService } from 'src/codigo-descuento/codigo-descuento.service';
import { CodigoDescuento } from 'src/codigo-descuento/codigoDescuento.entity';
import { DetalleCarrito } from 'src/detalle-carrito/detalleCarrito.entity';
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
    TypeOrmModule.forFeature([DetalleFactura,Factura,Producto,Usuario,DetalleCarrito,Carrito])
    ],
  controllers: [DetalleFacturaController,FacturaController,ProductoController],
  providers: [DetalleFacturaService,FacturaService,ProductoService]
})
export class DetalleFacturaModule {}
