import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Usuario from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { CarritoDTO } from './carrito.dto';
import { Carrito } from './carrito.entity';

@Injectable()
export class CarritoService {
    constructor(
        @InjectRepository(Carrito)private readonly repoCarrito: Repository<Carrito>,
        @InjectRepository(Usuario)private readonly repoUsuario : Repository<Usuario>){
    }

    public async getCarritos():Promise<Carrito[]>{
        try{
            const getCarritos : Carrito[] = await this.repoCarrito.find({relations:['usuario']});
            console.log(getCarritos);
            
            return getCarritos;
        }catch (error) {
            throw new HttpException( { error : `Error buscando los Carritos: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getCarrito(id:number):Promise<Carrito>{
        try{
            const getCarrito : Carrito = await this.repoCarrito.findOne(id,{relations:['usuario']});
            console.log(getCarrito);
            return getCarrito;
        }catch (error) {
            throw new HttpException( { error : `Error buscando el Carrito: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async postCarrito(carrito:CarritoDTO):Promise<Carrito>{
        try{
            const usuarioCarrito : Usuario = await this.repoUsuario.findOne(carrito.idUSUARIO)
                if(!usuarioCarrito){
                    throw new HttpException('No se pudo encontrar el usuario', HttpStatus.NOT_FOUND);
                }

            const newCarrito : Carrito = await this.repoCarrito.save(new Carrito(
                usuarioCarrito
            ));

            return newCarrito;
        }catch (error) {
            console.log(error.message);
            
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }


    public async putCarrito(id:number, carrito:CarritoDTO) : Promise<Carrito>{
        try{
            const carritoPut = await this.repoCarrito.findOne(id);
            if(!carritoPut){
                throw new HttpException('El carrito que desea modificar no existe', 404);
            }
            carritoPut.setIdUsuario(carrito.idUSUARIO),
        
            await this.repoCarrito.save(carritoPut);
            return carritoPut;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         } 
    }

    public async deleteCarrito(id:number): Promise<Carrito>{
        try{
            const carritoDelete = await this.repoCarrito.findOne(id);
            if(carritoDelete.getIdCarrito()){
                await this.repoCarrito.delete(id);
                return carritoDelete;
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
