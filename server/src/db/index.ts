import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect("mongodb://localhost/todos")
    .then(() => console.log("Connected to MongoDb..."))
    .catch((err) => console.log("Could not connect t o Mongodb...", err));
};

export default connectDb;
