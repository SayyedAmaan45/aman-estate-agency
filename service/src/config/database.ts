import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB=async ():Promise<void>=>{
    const mongoURI=process.env.MONGO_URI;

    if(!mongoURI){
        throw new Error ("Mongo URI is not Defined");
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully")
}


export default connectMongoDB;