import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get(':id/:producto')
        public async getDetalleFactura(@Param('id') idFactura:string, @Param('producto') idproducto:string):Promise<DetalleFactura>{
            return await this.detalleFacturaService.getDetalleFactura(parseInt(idFactura),parseInt(idproducto));
        }

    @Post('')
        public async createDetalleFactura(@Body() detalleFactura : DetalleFacturaDTO) : Promise<DetalleFactura>{
            return await this.detalleFacturaService.createDetalleFactura(detalleFactura);
        }

    @Delete(':id/:producto')
    public deleteFactura(@Param('id') id:number,@Param('producto') idproducto:number ): Promise<DetalleFactura> {
        return this.detalleFacturaService.deleteDetalleFactura(id,idproducto);
    }

    @Put(':id/:producto')
    public async updateDetalleFactura(@Param('id') id:number, @Param('producto') idProducto:number, @Body() detalleFactura:DetalleFacturaDTO): Promise<DetalleFactura>{
        return await this.detalleFacturaService.putDetalleFactura(id,idProducto,detalleFactura)
    }


}
