import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from 'src/factura/factura.entity';
import { Producto } from 'src/producto/producto.entity';
import { Repository } from 'typeorm';
import { DetalleFacturaDTO } from './detalleFactura.dto';
import { DetalleFactura } from './detalleFactura.entity';

@Injectable()
export class DetalleFacturaService {

    constructor(@InjectRepository(DetalleFactura)private readonly repoDetalleFacturas: Repository<DetalleFactura>,
                @InjectRepository(Factura)private readonly repoFactura : Repository<Factura>,
                @InjectRepository(Producto)private readonly repoProducto: Repository<Producto>
                
                ){}


                 public async getAllDetalleFactura(): Promise<DetalleFactura[]>{
                    try{
                        const allDetalleFacturas : DetalleFactura[] = await this.repoDetalleFacturas.find({
                            relations:['factura','producto']});
                        return allDetalleFacturas;
                    }catch (error) {
                        throw new HttpException( { error : `Error buscando los detalles: ${error}`}, HttpStatus.NOT_FOUND);
                    }
                }


                public async getDetallesFactura(nro_factura:number): Promise<DetalleFactura[]>{
                    try{
                        const detallesFactura : DetalleFactura[] = await this.repoDetalleFacturas.find({
                            relations:['factura','producto'],where:{ id_factura:`${nro_factura}`}
                        });
                        return detallesFactura
                    }catch (error) {
                        throw new HttpException( { error : `Error buscando los detalles de la factura: ${error}`}, HttpStatus.NOT_FOUND);
                   }
                }   

                public async getDetalleFactura(nro_factura:number,codigo_producto:number): Promise<DetalleFactura>{
                    try{
                        const detalleFactura : DetalleFactura = await this.repoDetalleFacturas.findOne({
                            relations:['factura','producto'],where:{ id_factura:`${nro_factura}`, id_producto:`${codigo_producto}`}
                        });
                        return detalleFactura;
                    }catch (error) {
                        throw new HttpException( { error : `Error buscando los detalles de la factura: ${error}`}, HttpStatus.NOT_FOUND);
                   }
                }

                public async createDetalleFactura(detalleFactura:DetalleFacturaDTO): Promise<DetalleFactura>{
                    try{
                        const producto : Producto = await this.repoProducto.findOne(detalleFactura.id_producto);
                        if(!producto){
                            throw new HttpException( { error : `Error buscando el producto: ${detalleFactura.id_producto}`}, HttpStatus.NOT_FOUND);
                        }

                        const factura : Factura = await this.repoFactura.findOne(detalleFactura.id_factura);
                        if(!factura){
                            throw new HttpException( { error : `Error buscando el producto: ${detalleFactura.id_factura}`}, HttpStatus.NOT_FOUND);
                        }

                        if(!producto.getIdProducto() && factura.getNroFactura()){
                            const detalleFacturaNueva : DetalleFactura = await this.repoDetalleFacturas.save(new DetalleFactura(
                                producto.getIdProducto(),
                                factura.getNroFactura(),
                                detalleFactura.cantidad,
                            ))
                            return detalleFacturaNueva;
                        }

                        

                        

                        return null;
                    }  catch (error) {
                        console.log(error.message);
                        
                        throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        error: "there is an error in the request, " + error,
                        }, HttpStatus.NOT_FOUND);
                    } 
                }


                public async deleteDetalleFactura(nroFactura:number,codigoProducto:number): Promise<DetalleFactura>{
                    try{
                        const detalleFactura = await this.repoDetalleFacturas.findOne({ where:{id_producto:`${codigoProducto}`, id_factura:`${nroFactura}`}})

                        if(!detalleFactura){
                            throw new HttpException( { error : `Error buscando la factura: ${nroFactura}, ${codigoProducto}`}, HttpStatus.NOT_FOUND);
                        }else{
                            await this.repoDetalleFacturas.delete(detalleFactura);
                            return detalleFactura;
                        }
                    }catch (error) {
                        console.log(error.message);
                        
                        throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        error: "there is an error in the request, " + error,
                        }, HttpStatus.NOT_FOUND);
            
                       }
                            
                    }

                        
                    
                


            
}
