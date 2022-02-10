export class FacturaDTO{
    readonly total:number;
    readonly usuario:number;
}

//10-02-22
 //MODIFICACION EN BASE DE DATOS POR TIMESTAMP 
 
 //ALTER TABLE `proyectocfl`.`factura` 
//CHANGE COLUMN `fecha` `fecha` TIMESTAMP NOT NULL DEFAULT NOW() ;