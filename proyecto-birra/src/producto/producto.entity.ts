import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('producto')
export class Producto{

    @PrimaryGeneratedColumn()
    private id_producto:number;

    @Column()
    private nombre:string;

    @Column()
    private marca:string;

    @Column()
    private precio:number;

    @Column()
    private alcohol:number;

    @Column()
    private ibu:number;

    @Column()
    private color:string;

    @Column()
    private stock:number;


    constructor(nombre:string,marca:string,precio:number,alcohol:number,ibu:number,color:string,stock:number){
        this.nombre=nombre;
        this.marca=marca;
        this.precio=precio;
        this.alcohol=alcohol;
        this.ibu=ibu;
        this.color=color;
        this.stock=stock;
    }

     public getIdProducto():number{
        return this.id_producto;
    }

    public setPrecio(precio:number){
        this.precio=precio;
    }

    public setStock(stock:number){
        this.stock=stock;
    }
}