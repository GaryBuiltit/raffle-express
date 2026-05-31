import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoPass = process.env.MONGO_PWORD;
const uri = `mongodb+srv://garybuiltit86:${mongoPass}@cluster0.kdt49gm.mongodb.net/raffle_express?appName=Cluster0`;

let connectPromise = null;

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 1,
      maxIdleTimeMS: 10000,
    });
  }

  await connectPromise;
  return mongoose;
}

export async function closeDb() {
  if (mongoose.connection.readyState === 0) {
    connectPromise = null;
    return;
  }

  await mongoose.disconnect();
  connectPromise = null;
}
