import { DetalleCarrito } from "src/detalle-carrito/detalleCarrito.entity";
import Usuario from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carrito')
export class Carrito{
   
    @PrimaryGeneratedColumn()
    private id_carrito:number;

    

    @OneToOne(type => Usuario)
    @JoinColumn({name:'idUSUARIO'}) //CAMBIAR NOMBRE A COLUMNA EN BBDD
    public usuario :Usuario;


    @OneToMany(type => DetalleCarrito, detalleCarrito => detalleCarrito.carrito)
    public detalleCarrito : DetalleCarrito[];


    constructor(usuario:Usuario){
        this.usuario=usuario;
    }

    public getIdCarrito():number{
        return this.id_carrito;
    }

    public setIdUsuario(idUsuario){
        this.usuario = idUsuario;
    } //CHEQUEAR
}