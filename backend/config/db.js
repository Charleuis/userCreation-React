import mongoose from "mongoose";

const mongoDBConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Database Connected");
    } catch (error) {
      console.error("Database Connection Error:", error);
    }
  };
  

export default mongoDBConnect