import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { CodigoDescuento } from 'src/codigo-descuento/codigoDescuento.entity';
import { UsuarioController } from 'src/usuario/usuario.controller';
import Usuario from 'src/usuario/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { FacturaController } from './factura.controller';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura,Usuario,Carrito])
    ],
  controllers: [FacturaController,UsuarioController],
  providers: [FacturaService,UsuarioService]
})
export class FacturaModule {}
