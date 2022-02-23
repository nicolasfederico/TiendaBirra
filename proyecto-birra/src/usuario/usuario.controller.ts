import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { usuarioDTO } from './usuario.dto';
import Usuario from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor( private readonly usuarioService: UsuarioService){}


    @Get()
    public async getUsuarios():Promise<Usuario[]>{
        return await this.usuarioService.getUsuarios();
    }


    @Get(':id')
    public async getUsuario(@Param('id') id:string): Promise<Usuario>{
        return await this.usuarioService.getUsuario(parseInt(id));
        
    }
    
    @Get('/login/:mail/:password')
    public async getUsuarioEmailPass(@Param('mail') mail:string, @Param ('password') password:string): Promise<Usuario>{
        return await this.usuarioService.getUsuarioEmailPass(mail,password);
        
    }

    @Get('/get/:mail')
    public async getUsuarioEmail(@Param('mail') mail:string): Promise<number>{
        return await this.usuarioService.getUsuarioEmail(mail);
        
    }

    @Get('/get/carrito/:idUsuario')
    public async getIdCarrito(@Param('idUsuario') idUsuario:number): Promise<number>{
        return await this.usuarioService.getIdCarrito(idUsuario);
        
    }

    @Get('/recuperarPass/:mail')
    public async recuperarPassword(@Param('mail') mail:string): Promise<Usuario>{
        return await this.usuarioService.recuperarPassword(mail);
    }


    @Post('')
    public async addUsuario(@Body() usuario:usuarioDTO): Promise<Usuario>{
        return await this.usuarioService.addUsuario(usuario);
    }

     @Put(':id')
     public async putUsuario(@Param('id') id:number, @Body() usuario:usuarioDTO): Promise<Usuario>{
         return await this.usuarioService.putUsuario(id,usuario);
     }

     @Delete(':id')
     public async deleteUsuario(@Param('id') id:number) : Promise<Usuario>{
         return await this.usuarioService.deleteUsuario(id);
     }

}
