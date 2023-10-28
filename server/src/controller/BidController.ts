
import "reflect-metadata";
import IBidService from "../interface/IBidService";
import {injectable, inject, singleton} from "tsyringe";
import { Bid } from "../model/bid";
import { ValidationError } from "../exception/ValidationError";
import {  Body, Get, Post, Route, SuccessResponse } from "tsoa";
import IProductService from "../interface/IProductService";
import {Product } from "../model/product";
import ProductDetail from "../model/productDetail";


@singleton()
@injectable()
@Route("bid")

export class BidController {
    private bidService: IBidService;  
    private productService:IProductService;

    constructor (@inject("IBidService")bidService: IBidService,
     @inject("IProductService") productService: IProductService) { 
      this.bidService = bidService;
      this.productService= productService;
    }
    
  /**
   * Retrieves the list  of a bids.
   
   */
    @Get("show-bids/{productId}")
     public async getBids(productId:string): Promise<Array<Bid>| null> {
      return await this.bidService.getProductBids(productId);
       
    }

  //   /**
  //  * Retrieves the list  of a bids.
   
  //  */
  //    @Get("ProductBids\{:productId}")
  //    public async getProductBids(productId:string): Promise<Array<Bid>| null>{
  //     return await this.bidService.getProductBids(productId);
       
  //   }

     /**
   * Retrieves the list  of a bids.
   
   */
    @SuccessResponse("201", "Created") 
    @Post()
      public async saveBid( @Body() bid:Bid): Promise<string> {
         
        const validationMsg= await this.validateBid(bid)
        if(!validationMsg)  
          return this.bidService.saveBid(bid);
        else
         throw new ValidationError(validationMsg);
    }

    validateBid= async (bid: Bid):Promise<string>=> {
      
      
    
      if(!bid.productId)  
        return "Product Id required";  
      
      if(!bid.buyerId)  
        return "Buyer Id required";  
        
      if(bid.buyerEmail.length<5 || bid.buyerEmail.length>30)
        return "Email should follow min 5 to max 30 chars";
      
      const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!regexp.test(bid.buyerEmail))
        return "Email should follow standard format";
  
      if(!bid.bidAmount)
        return "Bid Amount should  be not null";      
        
      if(bid.bidAmount<0)
          return "Bid Amount should be greated than zero";
          
      const product:ProductDetail= await this.productService.getProductDetails(bid.productId);
      console.log(product);
      if(product)
      {
        if(product.product.bidEndDate< bid.requestedDate)
        {
          return "Bid date is over";   
        }
      }
      else{
        console.log("product not found");
        return "product not found";   
      }
       
      
      return "";
    }
  }
  
  export default BidController ;



