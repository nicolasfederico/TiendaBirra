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


                public async createDetalleFactura(detalleFactura:DetalleFacturaDTO): Promise<DetalleFactura>{
                    try{
                        const createProducto : Producto = await this.repoProducto.findOne(detalleFactura.idProducto);
                        if(!createProducto){
                            throw new HttpException( { error : `Error buscando el producto: ${detalleFactura.idProducto}`}, HttpStatus.NOT_FOUND);
                        }
            
                        const createFactura : Factura = await this.repoFactura.findOne(detalleFactura.idFactura);
                        if(!createFactura){
                            throw new HttpException( { error : `Error buscando la factura: ${detalleFactura.idFactura}`}, HttpStatus.NOT_FOUND);
                        }
            
                        const createDetalleFactura : DetalleFactura = await this.repoDetalleFacturas.save(new DetalleFactura(
                            createFactura.getNroFactura(),
                            createProducto.getIdProducto(),
                            detalleFactura.cantidad
                        ));
                        return createDetalleFactura;
                    }catch (error) {
                        console.log(error.message);
                        
                        throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        error: "there is an error in the request, " + error,
                        }, HttpStatus.NOT_FOUND);
            
                    }
                }

            
}
