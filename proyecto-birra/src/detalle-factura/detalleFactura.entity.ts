import { Factura } from "src/factura/factura.entity";
import { Producto } from "src/producto/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('detalle_factura')
    export class DetalleFactura{
        @PrimaryColumn()
        private id_producto:number;

        @PrimaryColumn()
        private id_factura:number;

        @Column()
        private cantidad:number;


        @ManyToOne(type => Factura, factura => factura.detalleFacturas)
        @JoinColumn({name: 'id_factura'})
        public factura : Factura;

        @ManyToOne(type => Producto, producto => producto.detalles)
        @JoinColumn({name : 'id_producto'})

        public producto: Producto;


        constructor(id_producto:number,id_factura:number,cantidad:number){
            this.id_producto=id_producto;
            this.id_factura=id_factura;
            this.cantidad=cantidad;
        }


        public getIdFactura():number{
            return this.id_factura;
        }

        public getIdProducto():number{
            return this.id_producto;
        }

        public getCantidad():number{
            return this.cantidad;
        }

        public setCantidad(cantidad:number){
            this.cantidad=cantidad;
        }

         
    }