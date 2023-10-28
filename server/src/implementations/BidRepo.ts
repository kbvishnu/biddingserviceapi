
import * as mongodb from "mongodb";
import IBidRepo  from "../interface/IBidRepo";
import { Bid } from "../model/bid";
import {collections} from "../database";


export class BidRepo implements IBidRepo{
    private bidCollection : mongodb.Collection<Bid>;
  
    constructor () { 
      this.bidCollection = collections.bids;
    }


    public async getProductBids(productId:string): Promise<Bid[]> {
      const filter: mongodb.Filter<Bid> = {
        productId:productId
      } 
      return await this.bidCollection.find(filter).toArray();
   }

    getBids(): Promise<Bid[]> {
       return this.bidCollection.find({}).toArray();
    }

    async saveBid(bid:Bid):Promise<string>{

      const filter: mongodb.Filter<Bid> = {
        productId:bid.productId,
        buyerEmail : bid.buyerEmail
      } 
      const availableBid= await this.bidCollection.findOne(filter);

      if(availableBid){
         const updateResult = await this.bidCollection.updateOne(filter,  { $set: {"bidAmount" : bid.bidAmount} },{ upsert: false });
         if (updateResult.acknowledged) 
            return availableBid._id.toString();
         
        throw new Error("Failed while trying to update bid"); 
      }
      else{
        const result = await this. bidCollection.insertOne(bid);
  
        if (result.acknowledged) 
           return result.insertedId.toString();
        
        throw new Error("Failed while trying to insert bid");          
        
      }

      
    }

}