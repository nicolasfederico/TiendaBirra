import { DetalleCarrito } from "src/detalle-carrito/detalleCarrito.entity";
import { DetalleFactura } from "src/detalle-factura/detalleFactura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    private imagen :string;

    @OneToMany(type => DetalleFactura,detalles => detalles.producto)
    
    public detalles : DetalleFactura [];


    @OneToMany(type => DetalleCarrito, detalleCarrito => detalleCarrito.producto)
    public detalleCarrito : DetalleCarrito[];


    constructor(nombre:string,marca:string,precio:number,alcohol:number,ibu:number,color:string,stock:number,imagen?:string){
        this.nombre=nombre;
        this.marca=marca;
        this.precio=precio;
        this.alcohol=alcohol;
        this.ibu=ibu;
        this.color=color;
        this.stock=stock;
        this.imagen = imagen
    }

     public getIdProducto():number{
        return this.id_producto;
    }

    public getPrecio():number{
        return this.precio;
    }

    public getStock():number{
        return this.stock;
    }

    public setNombre(nombre:string){
        this.nombre=nombre;
    }

    public setMarca(marca:string){
        this.marca=marca
    }
    
    public setalcohol(alcohol:number){
        this.alcohol=alcohol;
    }

    public setIbu(ibu:number){
        this.ibu=ibu;
    }

    public setColor(color:string){
        this.color=color;
    }


    public setPrecio(precio:number){
        this.precio=precio;
    }

    public setStock(stock:number){
        this.stock=stock;
    }

    public setImagen(imagen:string){
        this.imagen=imagen;
    }
}