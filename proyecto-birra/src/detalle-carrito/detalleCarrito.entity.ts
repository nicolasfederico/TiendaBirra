import { Carrito } from "src/carrito/carrito.entity";
import { Producto } from "src/producto/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity('detalle_carrito')
export class DetalleCarrito{

    @PrimaryColumn()
    private id_carrito:number;

    @PrimaryColumn()
    private id_producto:number;

    @Column()
    private cantidad:number;


    @ManyToOne(type => Producto, producto=> producto.detalleCarrito)
    @JoinColumn({name :'id_producto'})
    public producto: Producto;


    @ManyToOne(type => Carrito , carrito=> carrito.detalleCarrito)
    @JoinColumn({name:'id_carrito'})
    public carrito:Carrito

    constructor(id_carrito:number,id_producto:number,cantidad:number){
        this.id_carrito=id_carrito
        this.id_producto=id_producto;
        this.cantidad=cantidad;
    }


    public getIdCarrito():number{
        return this.id_carrito;
    }

    public getIdProducto():number{
        return this.id_producto
    }

    public setCantidad(cantidad:number){
        this.cantidad=cantidad;
    }
}