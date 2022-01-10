import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarritoDTO } from './carrito.dto';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {

    constructor(private readonly carritoService:CarritoService){}

    @Get()
    public async getCarritos():Promise<Carrito[]>{
        return await this.carritoService.getCarritos();
    }


    @Get(':id')
    public async getCarrito(@Param('id') id:string):Promise<Carrito>{
        return await this.carritoService.getCarrito(parseInt(id));
    }


    @Post('')
    public async postCarrito(@Body() carrito:CarritoDTO): Promise<Carrito>{
        return await this.carritoService.postCarrito(carrito);
    }

    @Put(':id')
    public async putCarrito(@Param('id') id:number, @Body() carrito:CarritoDTO): Promise<Carrito>{
        return await this.carritoService.putCarrito(id,carrito);
    }

    @Delete(':id')
    public async deleteCarrito(@Param('id') id:number) : Promise<Carrito>{
        return await this.carritoService.deleteCarrito(id);
    }
}
