import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CodigoDescuentoService } from './codigo-descuento.service';
import { codigoDescuentoDTO } from './codigoDescuento.dto';
import { CodigoDescuento } from './codigoDescuento.entity';

@Controller('codigo-descuento')
export class CodigoDescuentoController {

    constructor(private readonly codigoDescuentoService: CodigoDescuentoService){}


    @Get()
    public async getCodigosDescuentos():Promise<CodigoDescuento[]>{
        return await this.codigoDescuentoService.getCodigosDescuentos();
    }

    
    @Get(':id')
    public async getCodigoDescuento(@Param('id') idCodigoDescuento:string):Promise<CodigoDescuento>{
        return await this.codigoDescuentoService.getCodigoDescuento(idCodigoDescuento);
    }


    @Post('')
    public async addCodigoDescuento(@Body() codigoDescuento:codigoDescuentoDTO): Promise<CodigoDescuento>{
        return await this.codigoDescuentoService.postCodigoDescuento(codigoDescuento);
    }


    @Delete(':id')

    public async deleteUsuario(@Param('id') id:string) : Promise<CodigoDescuento>{
        return await this.codigoDescuentoService.deleteCodigoDescuento(id);
    }
    
    @Put(':id')
     public async putUsuario(@Param('id') id:string, @Body() codigoDescuento:codigoDescuentoDTO): Promise<CodigoDescuento>{
         return await this.codigoDescuentoService.putCodigoDescuento(id,codigoDescuento);
     }
}
