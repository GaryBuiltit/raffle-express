import raffle from "../models/Raffle.mjs";
import { getUserObjectId } from "../utils/resolveUser.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

const getAllRaffles = async (request) => {
  try {
    await connectDb();

    const body = await request.json();
    const user = body.user;

    const hostUserId = await getUserObjectId(user);
    if (!hostUserId) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: corsHeaders,
      });
    }

    let raffles = await raffle.find({ user: hostUserId });
    return new Response(JSON.stringify(raffles), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: corsHeaders,
    });
  } finally {
    await closeDb();
  }
};

export default getAllRaffles;
