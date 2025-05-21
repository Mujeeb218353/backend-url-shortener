import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {

    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`✅ MongoDB Connected !!!\nDB NAME: ${DB_NAME}\nHOST: ${connectionInstance.connection.host}`);

    } catch (error) {

        console.log("❌ MONGO_BD CONNECTION ERROR:",error);
        process.exit(1);

    }
}

mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose is Disconnected');
});

export { connectDB };