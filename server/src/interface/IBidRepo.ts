import { Bid } from "../model/bid";


interface IBidRepo {         
    getBids(): Promise<Bid[]>;
    saveBid(bid:Bid):Promise<string>;
    getProductBids(productId:string):Promise<Bid[]>;
  }

export default IBidRepo;