import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import Usuario from './usuario.entity';
import { Carrito } from 'src/carrito/carrito.entity';
import { CarritoService } from 'src/carrito/carrito.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Carrito])
    ],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
