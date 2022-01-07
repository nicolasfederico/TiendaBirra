import { CodigoDescuento } from "src/codigo-descuento/codigoDescuento.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity('trivia')
export class Trivia{

    @PrimaryColumn()
    private id_trivia:number;

    @Column()
    private pregunta:string;

    @Column()
    private respuesta:boolean;

    @OneToOne(type => CodigoDescuento)
    @JoinColumn()
    id_codigo_descuento :CodigoDescuento;


    constructor(pregunta:string,respuesta:boolean,id_codigo_descuento:CodigoDescuento){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.id_codigo_descuento=id_codigo_descuento;
    }

    public getIdTrivia():number{
        return this.id_trivia;
    }


    public setPregunta(pregunta:string){
        this.pregunta=pregunta;
    }

    public setRespuesta(respuesta:boolean){
        this.respuesta=respuesta;
    }
}