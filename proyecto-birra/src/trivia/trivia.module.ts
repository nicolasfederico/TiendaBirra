import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigoDescuento } from 'src/codigo-descuento/codigoDescuento.entity';
import { TriviaController } from './trivia.controller';
import { Trivia } from './trivia.entity';
import { TriviaService } from './trivia.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trivia,CodigoDescuento])],
    controllers: [TriviaController],
  providers: [TriviaService]
})
export class TriviaModule {}
