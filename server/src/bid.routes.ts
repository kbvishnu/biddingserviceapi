import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const bidRouter = express.Router();
bidRouter.use(express.json());
 
bidRouter.get("/", async (_req, res) => {
   try {
       const bids = await collections.bids.find({}).toArray();
       res.status(200).send(bids);
   } catch (error) {
       res.status(500).send(error.message);
   }
});


bidRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const bid = await collections.bids.findOne(query);
  
        if (bid) {
            res.status(200).send(bid);
        } else {
            res.status(404).send(`Failed to find an bid: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an bid: ID ${req?.params?.id}`);
    }
 });

 bidRouter.post("/", async (req, res) => {
    try {
        const bid = req.body;
        bid.requestedDate=new Date(bid.requestedDate);
        const result = await collections.bids.insertOne(bid);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new bid: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new bid.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 bidRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const bid = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.bids.updateOne(query, { $set: bid });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an bid: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an bid: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an bid: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 bidRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.bids.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an bid: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an bid: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an bid: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });