import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const productRouter = express.Router();
productRouter.use(express.json());
 

 productRouter.post("/", async (req, res) => {
    try {
        const product = req.body;
        product.bidEndDate=new Date(product.bidEndDate);
        const result = await collections.products.insertOne(product);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new product: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new product.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 

 productRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.products.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an product: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an product: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an product: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });