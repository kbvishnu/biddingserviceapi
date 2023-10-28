import * as mongodb from "mongodb";
 
export interface Product {
   name: string;   
   startingPrice: number;
   bidEndDate : Date;
   productId:string;
   _id?: mongodb.ObjectId;
}