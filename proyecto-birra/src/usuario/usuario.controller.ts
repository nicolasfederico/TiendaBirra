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
    public async getUsuarioEmail(@Param('mail') mail:string, @Param ('password') password:string): Promise<Usuario>{
        return await this.usuarioService.getUsuarioEmail(mail,password);
        
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
