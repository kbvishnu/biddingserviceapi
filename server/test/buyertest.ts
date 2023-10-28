
import { Mock, It, Times } from "moq.ts";
import { describe, expect,it } from '@jest/globals';

import IBidRepo from '../src/interface/IBidRepo';
import IBidService from '../src/interface/IBidService'
import { Bid } from '../src/model/bid';
import BidController from '../src/controller/BidController';
import {BidService} from '../src/implementations/BidService';


const arrangeBids=():Bid=>{
  const bid:Bid = { 
    bidAmount:2000,
    buyerId:"12367",
    sellerId:"34322",
    buyerEmail:"buyer1@buyers.com",
    productId:"3422",
    requestedDate:new Date()
  };
  return bid;

}

describe('Validate bid', () => {
 
 
  const mockBidRepo= new Mock<IBidRepo>();      
  const mockBidObject=mockBidRepo.object();  
  const bidService:IBidService= new BidService(mockBidObject);
  const bidController= new BidController(bidService);

  it(`When bid seller is empty`, async() => {
  
    const bidES=arrangeBids();
    bidES.sellerId="";
    try {
      
      await bidController.saveBid(bidES);
    } catch(e) {          
      expect(e.message).toMatch("Firstname should follow min 5 to max 30 chars");
    }
  }),
  it(`When bid productid is empty`, async() => {
  
    const bidPE=arrangeBids();
    bidPE.productId="";   
   
    try {
      
      await bidController.saveBid(bidPE);
    } catch(e) {          
      expect(e.message).toMatch("Lastname should follow min 5 to max 30 chars");
    }
  }),
  it(`When bid amount less than or equal to 0`, async() => {
  
    const bidAM=arrangeBids();
    bidAM.bidAmount=0;   
    
    try {
      
      await bidController.saveBid(bidAM);
    } catch(e) {          
      expect(e.message).toMatch("Phone number should be 10 digits");
    }
  }),  
  
  it(`When bid has no email`, async() => {
  
    const bidP4=arrangeBids();
    bidP4.buyerEmail="abcd";
    
    try {
      
      await bidController.saveBid(bidP4);
    } catch(e) {          
      expect(e.message).toMatch("Email should follow standard format");
    }
  })

});


describe('Get bid', () => {   
      
  it(`Returns List of bids `, async () => {
              
        
    const bid= arrangeBids();
    const bids=  [bid];
    
    const mockBidRepo=  
    new Mock<IBidRepo>()    
    .setup(async instance => instance.getBids()).returnsAsync(bids);

    const mockBidObject=mockBidRepo.object();   

    const bidService:IBidService= new BidService(mockBidObject);
    const bidController= new BidController(bidService);   

    const actual = await bidController.getBids();

    expect(actual).toBe(bids);
    mockBidRepo.verify(instance=>instance.getBids,Times.Once());         
    
    })
         
})

describe('Save bid', () => {
  
  it(`Returns bid id`, async () => {
              
    const bid =arrangeBids();

    const mockBidRepo=  
    new Mock<IBidRepo>()    
    .setup(async instance => instance.saveBid(It.IsAny<Bid>())).returnsAsync("bidId");

    const mockBidObject=mockBidRepo.object();   

    const bidService:IBidService= new BidService(mockBidObject);
    const bidController= new BidController(bidService);         
            

    const actual = await bidController.saveBid(bid);

    expect(actual).toBe("bidId");
    mockBidRepo.verify(instance=>instance.saveBid,Times.Once());         
    
    })
  
  })



 
 
    