import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaModule } from './factura/factura.module';
import { ProductoModule } from './producto/producto.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { CodigoDescuento } from './codigo-descuento/codigoDescuento.entity';
import { CodigoDescuentoModule } from './codigo-descuento/codigo-descuento.module';
import { TriviaController } from './trivia/trivia.controller';
import { TriviaModule } from './trivia/trivia.module';
import { CarritoModule } from './carrito/carrito.module';
import { DetalleCarritoController } from './detalle-carrito/detalle-carrito.controller';
import { DetalleCarritoModule } from './detalle-carrito/detalle-carrito.module';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..',
    'client'),
    }),
    TypeOrmModule.forRoot(),UsuarioModule,FacturaModule, ProductoModule, DetalleFacturaModule,CodigoDescuentoModule, TriviaModule, CarritoModule, DetalleCarritoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
