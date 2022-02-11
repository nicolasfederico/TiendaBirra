import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { CodigoDescuento } from 'src/codigo-descuento/codigoDescuento.entity';
import { DetalleCarrito } from 'src/detalle-carrito/detalleCarrito.entity';
import { Producto } from 'src/producto/producto.entity';
import Usuario from 'src/usuario/usuario.entity';
import { Like, Repository } from 'typeorm';
import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';
@Injectable()
export class FacturaService {
    constructor(@InjectRepository(Factura)private readonly repoFactura: Repository<Factura>,
                @InjectRepository(Usuario)private readonly repoUsuario: Repository<Usuario>,
                @InjectRepository(DetalleCarrito)private readonly repoDetalleCarrito: Repository<DetalleCarrito>,
                @InjectRepository(Producto)private readonly repoProducto: Repository<Producto>,
                @InjectRepository(Carrito)private readonly repoCarrito: Repository<Carrito>
                ){
    }
    public async getFacturas(): Promise<Factura[]>{
        try{
            const facturas : Factura[] = await this.repoFactura.find({relations: ['usuario','detalleFacturas','codigoDescuento']});
            console.log(facturas);
            return facturas;
        }catch (error) {
            throw new HttpException( { error : `Error buscando las facturas: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    public async getFactura(id:number): Promise<Factura>{
        try{
            const factura : Factura = await this.repoFactura.findOne(id,{relations: ['usuario','detalleFacturas','codigoDescuento']});
            console.log(factura);
            return factura;  
        }catch (error) {
            throw new HttpException( { error : `Error buscando las facturas: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    public async postFactura(idUsuario:number): Promise<Factura>{
        try{
            let total = 0;

            const carrito : Carrito = await this.repoCarrito.findOne({
                where: {
                    usuario:{
                        idUSUARIO: Like (idUsuario),
                    },
                },relations:['usuario'],
            });              
            let usuario : Usuario = await this.repoUsuario.findOne(idUsuario)

            let idCarrito = carrito.getIdCarrito();
            const detallesCarrito : DetalleCarrito[] = await this.repoDetalleCarrito.find({
                relations:['carrito','producto'],where:{ id_carrito:`${idCarrito}`}
            });

            console.log(detallesCarrito)

                for (let i = 0; i<detallesCarrito.length; i++){
                    let cantidad = detallesCarrito[i].getCantidad();
                    let idProducto = detallesCarrito[i].getIdProducto();
                    let producto: Producto = await this.repoProducto.findOne(idProducto)                    
                    let precio = producto.getPrecio();
                    let subtotal = cantidad * precio;
                    total+=subtotal;
                }


            const postFactura : Factura = await this.repoFactura.save(new Factura(
                total,
                usuario
            ));
            return postFactura;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         }
    }
    public async updateFactura(id:number,facturadto:FacturaDTO): Promise<Factura>{
        try{
            const putFactura : Factura = await this.repoFactura.findOne(id);
            if(!putFactura){
                throw new HttpException('La factura que desea modificar no existe', 404);
            }
            await this.repoFactura.save(putFactura);
            return putFactura;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         }
    }
    public async deleteFactura(id:number): Promise<Factura>{
        try{
            const deleteFactura : Factura = await this.repoFactura.findOne(id);
            if(!deleteFactura){
                throw new HttpException('La factura que desea borrar no existe', 404);
            }
            await this.repoFactura.delete(id);
            return deleteFactura;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         }
    }
}