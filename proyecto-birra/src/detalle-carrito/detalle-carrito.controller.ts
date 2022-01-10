import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetalleCarritoDTO } from './detaleCarrito.dto';
import { DetalleCarritoService } from './detalle-carrito.service';
import { DetalleCarrito } from './detalleCarrito.entity';

@Controller('detalle-carrito')
export class DetalleCarritoController {


    constructor(private readonly detalleCarritoService:DetalleCarritoService){}


    @Get()
    public async getAllDetallesCarrito():Promise<DetalleCarrito[]>{
        return await this.detalleCarritoService.getAllDetalleCarrito();
    }

    @Get(':id')
        public async getDetallesCarrito(@Param('id') id:string):Promise<DetalleCarrito[]>{
            return await this.detalleCarritoService.getDetallesCarrito(parseInt(id));
        }

        @Get(':id/:producto')
        public async getDetalleCarrito(@Param('id') idCarrito:string, @Param('producto') idproducto:string):Promise<DetalleCarrito>{
            return await this.detalleCarritoService.getDetalleCarrito(parseInt(idCarrito),parseInt(idproducto));
        }

    @Post('')
        public async createDetalleCarrito(@Body() detalleCarrito : DetalleCarritoDTO) : Promise<DetalleCarrito>{
            return await this.detalleCarritoService.createDetalleCarrito(detalleCarrito);
        }

    @Delete(':id/:producto')
    public deleteDetalleCarrito(@Param('id') id:number,@Param('producto') idproducto:number ): Promise<DetalleCarrito> {
        return this.detalleCarritoService.deleteDetalleCarrito(id,idproducto);
    }

    @Put(':id/:producto')
    public async updateDetalleCarrito(@Param('id') id:number, @Param('producto') idProducto:number, @Body() detalleCarrito:DetalleCarritoDTO): Promise<DetalleCarrito>{
        return await this.detalleCarritoService.putDetalleCarrito(id,idProducto,detalleCarrito)
    }

}
