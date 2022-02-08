import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { Repository } from 'typeorm';
import { usuarioDTO } from './usuario.dto';
import Usuario from './usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario)private readonly repoUsuario: Repository<Usuario>,
    @InjectRepository(Carrito)private readonly repoCarrito: Repository<Carrito>){

    }

    public async getUsuarios():Promise<Usuario[]>{
        try{
            const usuarios : Usuario[] = await this.repoUsuario.find({relations: ['facturas']});
            console.log(usuarios);
            return usuarios;
        }catch (error) {
            throw new HttpException( { error : `Error buscando los Usuarios: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getUsuario(id:number):Promise<Usuario>{
        try{
            const usuario : Usuario = await this.repoUsuario.findOne(id,{relations:['facturas']});
            console.log(usuario);
            return usuario;
        }catch (error) {
            throw new HttpException( { error : `Error buscando el Usuario: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getUsuarioEmailPass(mail:string,password:string):Promise<Usuario>{
        try{
            const usuario : Usuario = await this.repoUsuario.findOne({where:[{"mail":`${mail}`}]});
            
            if (usuario.getPassword() == password && usuario.getMail() == mail){
                return usuario;
            }
            return null;
        }
        catch (error) {
            throw new HttpException( { error : `Error buscando el Usuario: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getUsuarioEmail(mail:string):Promise<number>{
        try{
            const usuario : Usuario = await this.repoUsuario.findOne({where:[{"mail":`${mail}`}]});

            console.log(usuario);
            return usuario.getIdUsuario();
        }catch (error) {
            throw new HttpException( { error : `Error buscando el Usuario: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }



    public async addUsuario(usuario:usuarioDTO) : Promise<Usuario>{
        try{
            const newUsuario : Usuario = await this.repoUsuario.save(new Usuario(
                usuario.nombre,
                usuario.apellido,
                usuario.dni,
                usuario.direccion,
                usuario.mail,
                usuario.admin,
                usuario.telefono,
                usuario.password
            ));
            let idUsuario: Usuario = await this.repoUsuario.findOne({where:[{"mail":`${usuario.mail}`}]})
            
            
            const newCarrito : Carrito = await this.repoCarrito.save (new Carrito (
                idUsuario
            ))

            return newUsuario;
        }catch (error) {
            console.log(error.message);
            
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         } 
    }


    public async putUsuario(id:number, usuario:usuarioDTO) : Promise<Usuario>{
        try{
            const usuarioPut = await this.repoUsuario.findOne(id);
            if(!usuarioPut){
                throw new HttpException('El usuario que desea modificar no existe', 404);
            }
            usuarioPut.setNombre(usuario.nombre),
            usuarioPut.setApellido(usuario.apellido),
            usuarioPut.setDireccion(usuario.direccion),
            usuarioPut.setEmail(usuario.mail),
            usuarioPut.setAdmin(usuario.admin),
            usuarioPut.setTelefono(usuario.telefono),
            usuarioPut.setPassword(usuario.password);
            await this.repoUsuario.save(usuarioPut);
            return usuarioPut;
        }catch (error) {
            console.log(error.message);
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
         } 
    }


    public async deleteUsuario(id:number): Promise<Usuario>{
        try{
            const usuarioDelete = await this.repoUsuario.findOne(id);
            if(usuarioDelete.getIdUsuario()){
                await this.repoUsuario.delete(id);
                return usuarioDelete;
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
