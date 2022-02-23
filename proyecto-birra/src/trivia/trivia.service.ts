import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigoDescuento } from 'src/codigo-descuento/codigoDescuento.entity';
import { Repository } from 'typeorm';
import { TriviaDTO } from './trivia.dto';
import { Trivia } from './trivia.entity';

@Injectable()
export class TriviaService {

    constructor(@InjectRepository(Trivia)private readonly repoTrivias: Repository<Trivia>,
    @InjectRepository(CodigoDescuento)private readonly repoCodigoDescuento : Repository<CodigoDescuento>){

    }


    public async getTrivias():Promise<Trivia[]>{
        try{
            const getTrivias : Trivia[] = await this.repoTrivias.find({relations:['codigoDescuento']});
            console.log(getTrivias);
            
            return getTrivias;
        }catch (error) {
            throw new HttpException( { error : `Error buscando las Trivias: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }


    public async getTrivia(id:number):Promise<Trivia>{
        try{
            const getTrivia : Trivia = await this.repoTrivias.findOne(id,{relations:['id_codigo_descuento']});
        console.log(getTrivia);
        return getTrivia;
    }catch (error) {
        throw new HttpException( { error : `Error buscando la Trivia: ${error}`}, HttpStatus.NOT_FOUND);
    }

    }


    public async postTrivia(trivia:TriviaDTO):Promise<Trivia>{
        try{
            const newCodigoDescuento : CodigoDescuento = await this.repoCodigoDescuento.save (new CodigoDescuento(
                trivia.id_codigo_descuento,
                trivia.descuento,
                trivia.activo
            ))
            
            
            const codigoDescuento : CodigoDescuento = await this.repoCodigoDescuento.findOne(trivia.id_codigo_descuento)
                if(!codigoDescuento){
                    throw new HttpException('No se pudo encontrar el codigo de descuento', HttpStatus.NOT_FOUND);
                }

            const newTrivia : Trivia = await this.repoTrivias.save(new Trivia(
                trivia.pregunta,
                trivia.respuesta,
                codigoDescuento
            ));
            console.log(codigoDescuento)
            console.log(newTrivia)
            return newTrivia;
        }catch (error) {
            console.log(error.message);
            
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteTrivia(id:number):Promise<Trivia>{
        try{
            const trivia : Trivia = await this.repoTrivias.findOne(id);

            if(trivia){
                await this.repoTrivias.delete(id);
                return trivia;
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
}
