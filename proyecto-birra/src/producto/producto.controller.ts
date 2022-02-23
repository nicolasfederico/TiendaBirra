import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService:ProductoService){}


    @Get()
    public async getProductos(): Promise<Producto[]>{
        return await this.productoService.getProductos();
    }

    @Get(':id')

    public async getProducto(@Param('id') id:string):Promise<Producto>{
        return await this.productoService.getProducto(parseInt(id));

    }


    @Post('')
    public async postProducto(@Body()productodto: ProductoDTO): Promise<Producto>{
        return await this.productoService.postProducto(productodto);
    }

    @Put(':id')
    public async putProducto(@Param('id') id:number, @Body() productodto:ProductoDTO):Promise<Producto>{
        return await this.productoService.putProducto(id,productodto);
    }


    @Delete(':id')
    public async deleteProducto(@Param('id') id:number): Promise<Producto>{
        return await this.productoService.deleteProducto(id);
    }
}
