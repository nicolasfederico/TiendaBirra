import { type } from "os";
import { Factura } from "src/factura/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario')
export default class Usuario{

    @PrimaryGeneratedColumn()
    private idUSUARIO:number;

    @Column()
    private nombre:string;

    @Column()
    private apellido:string;

    @Column()
    private dni:number;

    @Column()
    private direccion:string;

    @Column()
    private mail:string;

    @Column()
    private admin:boolean;

    @Column()
    private telefono:number;

    @Column()
    private password:string;

    
    @OneToMany(type => Factura, factura => factura.usuario)
    public facturas : Factura[];

    constructor(nombre:string,apellido:string,dni:number,direccion:string,mail:string,admin:boolean,telefono:number,password:string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
        this.direccion=direccion;
        this.mail=mail;
        this.admin=admin;
        this.telefono=telefono;
        this.password=password;
    }

    public getIdUsuario():number{
        return this.idUSUARIO;
    }

    public getPassword():string{
        return this.password;
    }

    public getMail():string{
        return this.mail;
    }

    public setNombre(nombre:string):void{
        this.nombre=nombre;
    }

    public setApellido(apellido:string):void{
        this.apellido=apellido;
    }

    public setDireccion(direccion:string):void{
        this.direccion=direccion;
    }

    public setEmail(email:string):void{
        this.mail=email;
    }

    public setAdmin(admin:boolean):void{
        this.admin=admin;
    }

    public setTelefono(telefono:number):void{
        this.telefono=telefono;
    }

    public setPassword(password:string):void{
        this.password=password
    }

}