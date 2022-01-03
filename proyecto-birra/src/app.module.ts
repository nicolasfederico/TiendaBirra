import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaModule } from './factura/factura.module';
import { ProductoModule } from './producto/producto.module';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..',
    'client'),
    }),
    TypeOrmModule.forRoot(),UsuarioModule,FacturaModule, ProductoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
