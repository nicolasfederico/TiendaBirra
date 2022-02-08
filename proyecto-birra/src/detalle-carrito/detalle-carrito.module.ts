import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { Producto } from 'src/producto/producto.entity';
import Usuario from 'src/usuario/usuario.entity';
import { DetalleCarritoController } from './detalle-carrito.controller';
import { DetalleCarritoService } from './detalle-carrito.service';
import { DetalleCarrito } from './detalleCarrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleCarrito,Producto,Carrito,Usuario])
    ],
    controllers: [DetalleCarritoController],
  providers: [DetalleCarritoService]
})
export class DetalleCarritoModule {}
