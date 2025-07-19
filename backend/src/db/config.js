import mongoose from "mongoose";

export const connectDb = async () => {
    try {        
        const connectionInstance = await mongoose.connect(
            process.env.MONGO_URI
        );
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to DB: ", error);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDb;
