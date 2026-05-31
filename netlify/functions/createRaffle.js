import raffle from "../models/Raffle.mjs";
import { generateUniqueRafflePin } from "../utils/pinGenerator.js";
import { getUserObjectId } from "../utils/resolveUser.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const createRaffle = async (request) => {
  try {
    await connectDb();

    const body = await request.json();
    const raffleName = body.raffleName;
    const endDate = body.endDate;
    const endTime = body.endTime;
    const raffleDescription = body.description;
    const phone = body.phone ?? body.requirePhone;
    const clerkUserId = body.user;

    const hostUserId = await getUserObjectId(clerkUserId);
    if (!hostUserId) {
      return new Response(
        JSON.stringify({
          error: "User not found. Sign up before creating a raffle.",
        }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        },
      );
    }

    const pin = await generateUniqueRafflePin(raffle);

    let newRaffle = new raffle({
      raffleName: raffleName,
      endDate: endDate,
      endTime: endTime,
      description: raffleDescription,
      phone: phone,
      user: hostUserId,
      pin: pin,
    });

    let saveNewRaffle = await newRaffle.save();

    return new Response(JSON.stringify(saveNewRaffle), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log("error creating raffle: " + error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } finally {
    await closeDb();
  }
};

export default createRaffle;
