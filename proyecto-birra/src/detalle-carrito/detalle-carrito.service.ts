import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { Producto } from 'src/producto/producto.entity';
import Usuario from 'src/usuario/usuario.entity';
import { Like, Repository } from 'typeorm';
import { DetalleCarritoDTO } from './detalleCarrito.dto';
import { DetalleCarrito } from './detalleCarrito.entity';

@Injectable()
export class DetalleCarritoService {

    constructor(@InjectRepository(DetalleCarrito)private readonly repoDetalleCarrito: Repository<DetalleCarrito>,
                @InjectRepository(Carrito)private readonly repoCarrito : Repository<Carrito>,
                @InjectRepository(Producto)private readonly repoProducto: Repository<Producto>,
                @InjectRepository(Usuario)private readonly repoUsuario : Repository<Usuario>){}


                public async getAllDetalleCarrito(): Promise<DetalleCarrito[]>{
                    try{
                        const alldetallesCarrito : DetalleCarrito[] = await this.repoDetalleCarrito.find({
                            relations:['carrito','producto']});
                        return alldetallesCarrito;
                    }catch (error) {
                        throw new HttpException( { error : `Error buscando los detalles: ${error}`}, HttpStatus.NOT_FOUND);
                    }
                }


                public async getDetallesCarrito(id_carrito:number): Promise<DetalleCarrito[]>{
                    try{
                        const detallesCarrito : DetalleCarrito[] = await this.repoDetalleCarrito.find({
                            relations:['carrito','producto'],where:{ id_carrito:`${id_carrito}`}
                        });
                        return detallesCarrito
                    }catch (error) {
                        throw new HttpException( { error : `Error buscando los detalles de la factura: ${error}`}, HttpStatus.NOT_FOUND);
                   }
                } 


                public async getDetalleCarrito(id_carrito:number,id_producto:number): Promise<DetalleCarrito>{
                    try{
                        const detalleCarrito : DetalleCarrito = await this.repoDetalleCarrito.findOne({
                            relations:['carrito','producto'],where:{ id_carrito:`${id_carrito}`, id_producto:`${id_producto}`}
                        });
                        return detalleCarrito;
                    }catch (error) {
                        throw new HttpException( { error : `Error buscando los detalles de la factura: ${error}`}, HttpStatus.NOT_FOUND);
                   }
                }


                public async createDetalleCarrito(detalleCarrito:DetalleCarritoDTO, idUsuarioLS:number): Promise<DetalleCarrito>{
                    try{
                        const producto : Producto = await this.repoProducto.findOne(detalleCarrito.id_producto);
                        if(!producto){
                            throw new HttpException( { error : `Error buscando el producto: ${detalleCarrito.id_producto}`}, HttpStatus.NOT_FOUND);
                        }

                        let usuario: Usuario = await this.repoUsuario.findOne(idUsuarioLS);
                        if(!usuario){
                            throw new HttpException( { error : `Error buscando el carrito: ${idUsuarioLS}`}, HttpStatus.NOT_FOUND);
                        }

                        const carrito : Carrito = await this.repoCarrito.findOne({
                            where: {
                                usuario:{
                                    idUSUARIO: Like (`${usuario.getIdUsuario()}`),
                                },
                            },relations:['usuario'],
                        });





                        if(!carrito){
                            throw new HttpException( { error : `Error buscando el carrito: ${usuario.getIdUsuario()}`}, HttpStatus.NOT_FOUND);
                        }

                        
                            const detalleCarritoNueva : DetalleCarrito = await this.repoDetalleCarrito.save(new DetalleCarrito(
                                carrito.getIdCarrito(),
                                producto.getIdProducto(),
                                detalleCarrito.cantidad,
                            ))
                            return detalleCarritoNueva;
                    }  catch (error) {
                        console.log(error.message);
                        
                        throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        error: "there is an error in the request, " + error,
                        }, HttpStatus.NOT_FOUND);
                    } 
                }

                public async deleteDetalleCarrito(idUsuario:number): Promise<DetalleCarrito[]>{
                    try{
                        let usuario: Usuario = await this.repoUsuario.findOne(idUsuario);
                        
                        const carrito : Carrito = await this.repoCarrito.findOne({
                            where: {
                                usuario:{
                                    idUSUARIO: Like (`${usuario.getIdUsuario()}`),
                                },
                            },relations:['usuario'],
                        });
                        
                        const detalleCarrito:DetalleCarrito[] = await this.repoDetalleCarrito.find({ where:{id_carrito:`${carrito.getIdCarrito()}`}})
                        if(!detalleCarrito){
                            throw new HttpException( { error : `Error buscando la factura: ${carrito.getIdCarrito()}`}, HttpStatus.NOT_FOUND);
                        }else{
                            await this.repoDetalleCarrito.remove(detalleCarrito);
                            return detalleCarrito;
                        }
                    }catch (error) {
                        console.log(error.message);
                        
                        throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        error: "there is an error in the request, " + error,
                        }, HttpStatus.NOT_FOUND);
            
                       }
                    } 
                    public async putDetalleCarrito(idCarrito:number, idProducto:number,detalleCarrito: DetalleCarritoDTO): Promise<DetalleCarrito>{
                        try{
                            const detalleCarritoPut = await this.repoDetalleCarrito.findOne({where: {id_carrito:`${idCarrito}`, id_producto:`${idProducto}`}});

                            if(!detalleCarritoPut){
                                throw new HttpException( { error : `Error buscando la factura: ${idCarrito}, ${idProducto}`}, HttpStatus.NOT_FOUND);

                            }

                            detalleCarritoPut.setCantidad(detalleCarrito.cantidad);

                            await this.repoDetalleCarrito.save(detalleCarritoPut);

                            return detalleCarritoPut
                        }catch (error) {
                            console.log(error.message);
                            
                            throw new HttpException({
                            status: HttpStatus.NOT_FOUND,
                            error: "there is an error in the request, " + error,
                            }, HttpStatus.NOT_FOUND);
                
                           }
                    }
}
