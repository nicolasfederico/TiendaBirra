import { Factura } from "src/factura/factura.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";


Entity('codigo_descuento')
export class CodigoDescuento{

    @PrimaryColumn()
    private id_codigo_descuento:string;

    @Column()
    private descuento:number;

    /*
    @OneToMany(type => Factura, factura => factura.codigoDescuento)
    public factura : Factura[];

*/
    constructor(id_codigo_descuento:string,descuento:number){
        this.id_codigo_descuento=id_codigo_descuento;
        this.descuento=descuento;
    }


    public getIdCodigoDescuento():string{
        return this.id_codigo_descuento;
    }

    public getDescuento():number{
        return this.descuento;
    }

    public setDescuento(descuento:number){
        this.descuento = descuento;
    }

}