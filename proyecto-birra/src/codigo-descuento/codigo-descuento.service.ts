import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodigoDescuento } from './codigoDescuento.entity';

@Injectable()
export class CodigoDescuentoService {

    constructor(@InjectRepository(CodigoDescuento)private readonly repoCodigoDescuento : Repository<CodigoDescuento>){}

}
