import express from "express";

import { FoodModel } from "../../database/food";


const Router = express.Router();

/*

Route      /
Des        get all the foods based on the particular restaurant
Params     _id
Access     Public
Method     GET
*/

Router.get("/:_id",async(req,res)=>{
    try {
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant:_id});
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})


/*

Route      /r
Des        get all the foods based on the particular restaurant
Params     category
Access     Public
Method     GET
*/

Router.get("/r/:ctegory",async(req,res)=>{
    try {
        const {category} = req.params;
        const foods = await FoodModel.find({
            category: {$regex: category, $options:"i"}
        })
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

export default Router;