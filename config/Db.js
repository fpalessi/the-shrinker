import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose
      .set("strictQuery", true)
      .connect(process.env.MONGO_URI);
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB Conectado en : ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

export default dbConnect;
