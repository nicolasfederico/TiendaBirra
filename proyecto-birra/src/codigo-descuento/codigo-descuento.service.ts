import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { codigoDescuentoDTO } from './codigoDescuento.dto';
import { CodigoDescuento } from './codigoDescuento.entity';

@Injectable()
export class CodigoDescuentoService {

    constructor(@InjectRepository(CodigoDescuento)private readonly repoCodigoDescuento : Repository<CodigoDescuento>){}


    public async getCodigosDescuentos():Promise<CodigoDescuento[]>{
        try{
            const codigosDescuentos : CodigoDescuento[] = await this.repoCodigoDescuento.find();
            console.log(codigosDescuentos);
            return codigosDescuentos;
        }catch (error) {
            throw new HttpException( { error : `Error buscando los codigos de Descuentos: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }


    public async getCodigoDescuento(id:string):Promise<CodigoDescuento>{
        try{
            const codigoDescuento : CodigoDescuento = await this.repoCodigoDescuento.findOne(id);
            console.log(codigoDescuento);
            return codigoDescuento;
        }catch (error) {
            throw new HttpException( { error : `Error buscando el Usuario: ${error}`}, HttpStatus.NOT_FOUND);
        }

    }

    public async postCodigoDescuento(codigoDescuento:codigoDescuentoDTO):Promise<CodigoDescuento>{
        try{
            const newCodigoDescuento : CodigoDescuento = await this.repoCodigoDescuento.save(new CodigoDescuento(
                codigoDescuento.id_codigo_descuento,
                codigoDescuento.descuento,
                codigoDescuento.activo
            ));

            return newCodigoDescuento;
        }catch (error) {
            console.log(error.message);
            
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteCodigoDescuento(id:string):Promise<CodigoDescuento>{
        try{
            const codigoDescuentoDelete = await this.repoCodigoDescuento.findOne(id);
            if(codigoDescuentoDelete.getIdCodigoDescuento()){
                await this.repoCodigoDescuento.delete(id);
                return codigoDescuentoDelete;
            }else{
                throw new HttpException('el usuario no existe!', 404);
            }
        }
            catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
     }
   }  
    


    public async putCodigoDescuento(id:string,codigo:codigoDescuentoDTO):Promise<CodigoDescuento>{
        try{
            const codigoPut = await this.repoCodigoDescuento.findOne(id);
            if(!codigoPut){
                throw new HttpException('El usuario que desea modificar no existe', 404);
            }
            codigoPut.setDescuento(codigo.descuento),
            codigoPut.setActivo(codigo.activo),

            await this.repoCodigoDescuento.save(codigoPut);
                return codigoPut;
        }catch (error) {
        console.log(error.message);
        throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "there is an error in the request, " + error,
        }, HttpStatus.NOT_FOUND);
        } 
    }
}
