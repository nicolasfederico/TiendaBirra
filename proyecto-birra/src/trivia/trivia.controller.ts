import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TriviaDTO } from './trivia.dto';
import { Trivia } from './trivia.entity';
import { TriviaService } from './trivia.service';

@Controller('trivia')
export class TriviaController {

    constructor(private readonly triviaService:TriviaService){}


    @Get()
    public async getTrivias():Promise<Trivia[]>{
        return await this.triviaService.getTrivias();
    }


    @Get(':id')
    public async getTrivia(@Param('id') id:string):Promise<Trivia>{
        return await this.triviaService.getTrivia(parseInt(id));
    }


    @Post('')
    public async postTrivia(@Body() trivia:TriviaDTO): Promise<Trivia>{
        return await this.triviaService.postTrivia(trivia);
    }

    
    @Delete(':id')
    public async deleteTrivia(@Param('id') id:number) : Promise<Trivia>{
        return await this.triviaService.deleteTrivia(id);
    }
}
