import * as mongodb from "mongodb";
 
export interface Buyer {
   firstName: string;
   lastName: string;
   address: string;
   city: string;
   state: string;
   pin: string;
   phone:string;
   email:string; 
   _id?: mongodb.ObjectId;
}