import mongoose from "mongoose";
import raffle from "./models/Raffle.mjs";
import contestant from "./models/contestant.mjs";
import user from "./models/User.mjs";

const mongoPass = process.env.MONGO_PWORD;
const uri = `mongodb+srv://garybuiltit86:${mongoPass}@cluster0.kdt49gm.mongodb.net/?appName=Cluster0`;

let conn = null;

const connectDb = async () => {
  if (conn == null) {
    conn = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose)
      .catch((e) => console.log("conn error:" + e));

    await conn;
  }

  return conn;
};

const createUser = (event) => {
  try {
    let newUser = new user({
      email: event["email"],
    });

    return {
      statusCode: 200,
      body: `new user saved successfuly: ${newUser}`,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      error: error,
    };
  }
};

const createRaffle = async (event) => {
  let newRaffle = new raffle({
    raffleName: event["raffleName"],
    endDate: event["endDate"],
    endTime: event["endTime"],
    signupFields: event["signupFields"],
  });

  try {
    let saveNewRaffle = await newRaffle.save();
    await user.updateOne(
      { userID: event["user"] },
      { $push: { raffles: saveNewRaffle.raffleID } }
    );

    return {
      statusCode: 200,
      body: saveNewRaffle,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      error: error,
    };
  }
};

const getRaffle = async (event) => {
  try {
    let raffle = await raffle.findOne({
      id: event["raffleID"],
    });

    return {
      statusCode: 200,
      body: raffle,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      error: error,
    };
  }
};

const getAllRaffles = async (event) => {
  try {
    let raffles = await raffle.find({ user: event["user"] });
    return {
      statusCode: 200,
      body: raffles,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      error: error,
    };
  }
};

const addContestant = async (event) => {
  let newContestant = new contestant({
    raffle: event["raffle"],
    name: event["name"],
    email: event["email"],
    phone: event["phone"],
    avatar: event["avatar"],
    user: event["user"],
  });

  try {
    await newContestant.save();
    await user.updateOne(
      { user: event["user"] },
      { $push: { contestants: newContestant.contestantID } }
    );

    return {
      statusCode: 200,
      boby: `new contestant saved successfully: ${newContestant}`,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      error: error,
    };
  }
};

const getAllContestants = async (event) => {
  try {
    const contestants = contestant.find({ user: event["user"] });

    return {
      statusCode: 200,
      body: contestants,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      contestantsError: error,
    };
  }
};

const getContestant = async (event) => {
  try {
    const newContestant = contestant.findOne({
      contestantID: event["contestant"],
    });
    return {
      statusCode: 200,
      body: newContestant,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      contestantsError: error,
    };
  }
};

export const handler = async (event) => {
  const callType = event["function"];
  const returnData = null;

  try {
    await connectDb();
    console.log("db connected");
  } catch (error) {
    console.log("db connection error: " + error);
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "Connection to db failed" }),
    };
  }

  if (callType == "test") {
    returnData = {
      statusCode: 200,
      body: "test successful",
    };
  }

  if (callType == "createUser") {
    returnData = createUser(event);
  }

  if (callType == "createRaffle") {
    returnData = await createRaffle(event);
  }

  if (callType == "getRaffle") {
    returnData = await getRaffle(event);
  }

  if (callType == "getAllRaffles") {
    returnData = await getAllRaffles(event);
  }

  if (callType == "addContestant") {
    returnData = await addContestant(event);
  }

  if (callType == "getAllContestants") {
    returnData = getAllContestants(event);
  }

  if (callType == "getContestant") {
    returnData = getContestant(event);
  }

  return returnData;
};
