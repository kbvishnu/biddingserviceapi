import * as dotenv from "dotenv";


import { connectToDatabase } from "./database";
 
import App from "./app";


dotenv.config(); 
 
const { ATLAS_URI,PORT_NUMBER,APP_NAME } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = new App(Number(PORT_NUMBER),APP_NAME)

        app.listen();
       
   })
   .catch(error => console.error(error));