import * as express from "express";
import BidController from "../controller/BidController";
import { Router } from "express";
import  ValidationError  from "../exception/ValidationError";


const BidRouter=function(bidController:BidController) :Router{
    
    const router = express.Router();

    router.use(express.json());

    
    router.get("/", async (req,res) => {         
        const bids= bidController.getBids();
        res.statusCode=200;
        res.json({ bids });
    });

    router.post("/", async (req,res) => { 
        try{
            const bid = req.body;        
            const bidId= await bidController.saveBid(bid);
            res.statusCode=201;
            res.json({ bidId });
        }
        catch(e){
            
            if (e instanceof ValidationError) 
            {
                
                res.statusCode=422; 
            }
            else{
                res.statusCode=500;               
                
            }
            res.json(e.message);
        }
        return res;
    });

    return router;
}

export default BidRouter;

 
 


// bidRouter.get("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const bid = await collections.bids.findOne(query);
  
//         if (bid) {
//             res.status(200).send(bid);
//         } else {
//             res.status(404).send(`Failed to find an bid: ID ${id}`);
//         }
  
//     } catch (error) {
//         res.status(404).send(`Failed to find an bid: ID ${req?.params?.id}`);
//     }
//  });

//  bidRouter.post("/", async (req, res) => {
//     try {
//         const bid = req.body;
//         const result = await collections.bids.insertOne(bid);
  
//         if (result.acknowledged) {
//             res.status(201).send(`Created a new bid: ID ${result.insertedId}.`);
//         } else {
//             res.status(500).send("Failed to create a new bid.");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(error.message);
//     }
//  });

//  bidRouter.put("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const bid = req.body;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.bids.updateOne(query, { $set: bid });
  
//         if (result && result.matchedCount) {
//             res.status(200).send(`Updated an bid: ID ${id}.`);
//         } else if (!result.matchedCount) {
//             res.status(404).send(`Failed to find an bid: ID ${id}`);
//         } else {
//             res.status(304).send(`Failed to update an bid: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });

//  bidRouter.delete("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.bids.deleteOne(query);
  
//         if (result && result.deletedCount) {
//             res.status(202).send(`Removed an bid: ID ${id}`);
//         } else if (!result) {
//             res.status(400).send(`Failed to remove an bid: ID ${id}`);
//         } else if (!result.deletedCount) {
//             res.status(404).send(`Failed to find an bid: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });