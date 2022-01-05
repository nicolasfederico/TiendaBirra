import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Usuario from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';


@Injectable()
export class FacturaService {

    constructor(@InjectRepository(Factura)private readonly repoFactura: Repository<Factura>,
                @InjectRepository(Usuario)private readonly repoUsuario: Repository<Usuario>){

    }

    public async getFacturas(): Promise<Factura[]>{
        try{
            const facturas : Factura[] = await this.repoFactura.find({relations: ['usuario','detalleFacturas']});
            console.log(facturas);
            return facturas;
            
        }catch (error) {
            throw new HttpException( { error : `Error buscando las facturas: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getFactura(id:number): Promise<Factura>{
        try{
            const factura : Factura = await this.repoFactura.findOne(id,{relations: ['usuario','detalleFacturas']});
            console.log(factura);
            return factura;   
        }catch (error) {
            throw new HttpException( { error : `Error buscando las facturas: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async postFactura(facturadto:FacturaDTO): Promise<Factura>{
        try{
            let usuario : Usuario = await this.repoUsuario.findOne(facturadto.usuario)

            const postFactura : Factura = await this.repoFactura.save(new Factura(
                facturadto.fecha,
                facturadto.total,
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

            putFactura.setFecha(facturadto.fecha),
            putFactura.setTotal(facturadto.total);

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
