import { container, Lifecycle } from "tsyringe";
import IBidRepo from "../interface/IBidRepo";
import IBidService from "../interface/IBidService";
import {BidRepo }from "../implementations/BidRepo";
import {BidService} from "../implementations/BidService";
import BidController from "../controller/BidController"; 
import IProductService from "../interface/IProductService";
import { ProductService } from "../implementations/ProductService";



export  function registerDependencies() {
    
    
    container.register<IBidRepo>('IBidRepo', {useClass: BidRepo},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IBidService>('IBidService', {useClass: BidService},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IProductService>('IProductService', {useClass: ProductService},  
    { lifecycle: Lifecycle.Singleton } );

   
    container.registerSingleton(BidController); 
    
    return container;
    
}


   