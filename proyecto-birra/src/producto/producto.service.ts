import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {

    constructor(@InjectRepository(Producto)private readonly repoProducto:Repository<Producto>){}



    public async getProductos():Promise<Producto[]>{
        try{
            const productos : Producto[] = await this.repoProducto.find();
            return productos;
        }catch (error) {
            throw new HttpException( { error : `Error buscando los productos: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }


    public async getProducto(id:number): Promise<Producto>{
        try{
            const producto : Producto = await this.repoProducto.findOne(id);
            console.log(producto);
            return producto;   
        }catch (error) {
            throw new HttpException( { error : `Error buscando el producto: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }


    public async postProducto(productodto:ProductoDTO): Promise<Producto>{
        try{

            const postProducto : Producto = await this.repoProducto.save(new Producto(
                productodto.nombre,
                productodto.marca,
                productodto.precio,
                productodto.alcohol,
                productodto.ibu,
                productodto.color,
                productodto.stock
            ));
            return postProducto;
        }catch (error) {
            console.log(error.message);
            
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         } 
    }


    public async putProducto(id:number,productodto:ProductoDTO): Promise<Producto>{
        try{
            const putProducto : Producto = await this.repoProducto.findOne(id);

            if(!putProducto){
                throw new HttpException('La factura que desea modificar no existe', 404);
            }

            putProducto.setPrecio(productodto.precio),
            putProducto.setStock(productodto.stock);

            await this.repoProducto.save(putProducto);
            return putProducto;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         } 
    }


    public async deleteProducto(id:number): Promise<Producto>{
        try{
            const deleteProducto : Producto = await this.repoProducto.findOne(id);
            if(!deleteProducto){
                throw new HttpException('La factura que desea borrar no existe', 404);
            }

            await this.repoProducto.delete(id);
            return deleteProducto;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         } 
    }

}
