import Usuario from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carrito')
export class Carrito{
   
    @PrimaryGeneratedColumn()
    private id_carrito:number;

    // @Column()
    // private idUSUARIO:string; ESTA COLUMNA NO IRIA PORQUE ES LA RELACION

    @OneToOne(type => Usuario)
    @JoinColumn({name:'idUSUARIO'}) //CAMBIAR NOMBRE A COLUMNA EN BBDD
    public usuario :Usuario;

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