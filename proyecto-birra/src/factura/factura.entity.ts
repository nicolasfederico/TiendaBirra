
import { DetalleFactura } from "src/detalle-factura/detalleFactura.entity";
import Usuario from "src/usuario/usuario.entity";
import { Column, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";

    @Entity('factura')
    export  class Factura{
        @PrimaryGeneratedColumn()
        private nro_factura:number;

        @Column()
        private fecha:Date;

        @Column()
        private total:number;

        @ManyToOne(type => Usuario, usuario => usuario.facturas)
        @JoinColumn({name :'id_usuario'})
        public usuario : Usuario;

        @OneToMany(type => DetalleFactura, detalleFacturas => detalleFacturas.factura)
        public detalleFacturas : DetalleFactura[];

        constructor(fecha:Date,total:number,usuario:Usuario){
            this.fecha=fecha;
            this.total=total;
            this.usuario = usuario;      
        }
        public getNroFactura():number{
            return this.nro_factura;
        }
        public setFecha(fecha:Date):void{
            this.fecha=fecha;
        }
        public setTotal(total:number):void{
            this.total=total
        }
    }