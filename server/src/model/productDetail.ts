import {Bid} from "./bid";
import { Product } from "./product";

export default interface ProductDetail{
    product: Product,
    bids?: Bid[]    
}