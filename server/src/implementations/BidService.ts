import {injectable, inject} from "tsyringe";
import IBidRepo  from "../interface/IBidRepo";
import { Bid } from "../model/bid";
import IBidService from "../interface/IBidService";

@injectable()
export class BidService implements IBidService{
    private bidRepo: IBidRepo;  
  
    constructor (@inject("IBidRepo")bidRepo: IBidRepo) { 
      this.bidRepo = bidRepo;
    }


    public async getBids(): Promise<Bid[]> {
       return await this.bidRepo.getBids();
    }

    public async getProductBids(productId:string): Promise<Bid[]|null> {
      return await this.bidRepo.getProductBids(productId);
   }

    public async saveBid(bid:Bid):Promise<string>{
      return await this.bidRepo.saveBid(bid);
      
    }

}