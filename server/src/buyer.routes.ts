import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const buyerRouter = express.Router();
buyerRouter.use(express.json());
 
buyerRouter.get("/", async (_req, res) => {
   try {
       const buyers = await collections.buyers.find({}).toArray();
       res.status(200).send(buyers);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

buyerRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const buyer = await collections.buyers.findOne(query);
  
        if (buyer) {
            res.status(200).send(buyer);
        } else {
            res.status(404).send(`Failed to find an buyer: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an buyer: ID ${req?.params?.id}`);
    }
 });

 buyerRouter.post("/", async (req, res) => {
    try {
        const buyer = req.body;
        const result = await collections.buyers.insertOne(buyer);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new buyer: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new buyer.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 buyerRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const buyer = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.buyers.updateOne(query, { $set: buyer });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an buyer: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an buyer: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an buyer: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 buyerRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.buyers.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an buyer: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an buyer: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an buyer: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });