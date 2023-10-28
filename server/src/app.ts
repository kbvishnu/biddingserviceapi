import express,{ Response , Request, NextFunction  } from "express";
import bodyParser from "body-parser"; 
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import { registerDependencies } from "./di/DependencyRegister";

import { ValidationError } from "./exception/ValidationError";


class App {
  public app: express.Application;
  public port: number;
  private appName : string;
  
 
  constructor(port:number,appName:string) {
    
    this.app = express();
    this.port = port;
    this.appName= appName;
    
    this.initializeMiddlewares();
    
    this.initializeRouters();
    
    
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(morgan("tiny"));
    this.app.use(express.static("public"));
   

    this.app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
      
       
      return res.send(
        swaggerUi.generateHTML(await import("../public/swagger.json"))
      );
    });

    
  }

  private initializeRouters(){
    registerDependencies();
    RegisterRoutes(this.app);
    this.app.use(function errorHandler(
      err: unknown,
      req: Request,
      res: Response,
      next: NextFunction
    ): Response | void {
      if (err instanceof ValidationError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.message);
        return res.status(422).json({
          message: "Validation Failed",
          details:  err,
        });
      }
      if (err instanceof Error) {
        console.log(err);
        return res.status(500).json({
          message: "Internal Server Error",
          details : err
        });
      }   
      next();      
    });
  }


 
   
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`${this.appName} API listening on the port http:\\localhost:${this.port}`);
      
    });
  }
}
 
export default App;