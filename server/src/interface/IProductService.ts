
import ProductDetail from "../model/productDetail";
import { Product } from "../model/product";

interface IProductService {         
    saveProduct(product:Product): Promise<string>
    deleteProduct(productId:string):Promise<void>;
    getProducts():Promise<Product[]|null>;
    getProductDetails(productId:string):Promise<ProductDetail|null>;
  }

export default IProductService;