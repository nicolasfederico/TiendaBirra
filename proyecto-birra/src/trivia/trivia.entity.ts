import { CodigoDescuento } from "src/codigo-descuento/codigoDescuento.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('trivia')
export class Trivia{

    @PrimaryGeneratedColumn()
    private id_trivia:number;

    @Column()
    private pregunta:string;

    @Column()
    private respuesta:boolean;

    @OneToOne(type => CodigoDescuento)
    @JoinColumn({name:'id_codigo_descuento'})
    public codigoDescuento :CodigoDescuento;


    constructor(pregunta:string,respuesta:boolean,codigoDescuento:CodigoDescuento){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.codigoDescuento=codigoDescuento;
    }

    public getIdTrivia():number{
        return this.id_trivia;
    }

    public getCodigoDescuento():CodigoDescuento{
        return this.codigoDescuento;
    }


    public setPregunta(pregunta:string){
        this.pregunta=pregunta;
    }

    public setRespuesta(respuesta:boolean){
        this.respuesta=respuesta;
    }
}