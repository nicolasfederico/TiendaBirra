import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaDTO } from './detalleFactura.dto';
import { DetalleFactura } from './detalleFactura.entity';

@Controller('detalle-factura')
export class DetalleFacturaController {

    constructor(private readonly detalleFacturaService:DetalleFacturaService){}


    @Get()
    public async getDetalleFacturas():Promise<DetalleFactura[]>{
        return await this.detalleFacturaService.getAllDetalleFactura();
    }

    @Get(':id')
        public async getDetallesFactura(@Param('id') id:string):Promise<DetalleFactura[]>{
            return await this.detalleFacturaService.getDetallesFactura(parseInt(id));
        }

     @Post('')
        public async createDetalleFactura(@Body() detalleFactura : DetalleFacturaDTO) : Promise<DetalleFactura>{
            return await this.detalleFacturaService.createDetalleFactura(detalleFactura);
        }
}
