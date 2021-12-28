import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Controller('factura')
export class FacturaController {

    constructor(private readonly facturaService:FacturaService){}

    @Get()
    public async getFacturas():Promise<Factura[]>{
        return await this.facturaService.getFacturas();
    }


    @Get(':id')

    public async getFactura(@Param('id') id:string):Promise<Factura>{
        return await this.facturaService.getFactura(parseInt(id));

    }


    @Post('')
    public async postFactura(@Body()facturadto: FacturaDTO): Promise<Factura>{
        return await this.facturaService.postFactura(facturadto);
    }

    @Put(':id')
    public async putFactura(@Param('id') id:number, @Body() facturadto:FacturaDTO):Promise<Factura>{
        return await this.facturaService.updateFactura(id,facturadto);
    }

    @Delete(':id')
    public async deleteFactura(@Param('id') id:number): Promise<Factura>{
        return await this.facturaService.deleteFactura(id);
    }
}
