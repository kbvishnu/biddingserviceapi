import { Get, Route } from "tsoa";



@Route("ping")
export  class PingController {
  @Get("/")
  public  getPing(): string {
    return "Bidding service is running";
  }
} 

export default  PingController 