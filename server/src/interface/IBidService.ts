
import { Bid } from "../model/bid";


interface IBidService {         
    getBids(): Promise<Bid[]>
    saveBid(bid:Bid):Promise<string>;
    getProductBids(productId:string):Promise<Bid[]>;
  }

export default IBidService;