import * as mongodb from "mongodb";
 
export interface Bid {
   productId: string;
   //sellerId?: string;
   buyerId:string;
   buyerEmail:string;
   bidAmount:number;
   requestedDate:Date;   
   _id?: mongodb.ObjectId;
}