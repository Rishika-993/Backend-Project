// require("dotenv").config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({path: './env'});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at PORT:  ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection ERROR: ", err);
})

/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();
//efi
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on( "error", (error) => {
            console.log("ERRR:", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })    
    } catch (error) {
        console.log("ERROR: ", error); 
        throw err
    }
})();    
*/